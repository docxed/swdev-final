const pool = require("../config/database")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const updateUserPass = async (oldpassword, password, user_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    const [[rawPassword]] = await conn.query(
      "SELECT password FROM users WHERE id = ?",
      [user_id]
    )

    if (!rawPassword) {
      return { status: false, message: "ไม่พบรหัสผ่านเดิม" }
    } else if (!(await bcrypt.compare(oldpassword, rawPassword.password))) {
      return { status: false, message: "รหัสผ่านเดิมผิด" }
    }
    const password_encrypted = await bcrypt.hash(password, 5)
    await conn.query("UPDATE users SET password=? WHERE id = ?", [
      password_encrypted,
      user_id,
    ])

    conn.commit()
    return { status: true, message: "เปลี่ยนรหัสผ่านสำเร็จ" }
  } catch (err) {
    conn.rollback()
    return {
      status: false,
      message: err.toString(),
    }
  } finally {
    conn.release()
  }
}

const updateUserProfile = async (firstname, lastname, user_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    await conn.query("UPDATE users SET firstname=?, lastname=? WHERE id = ?", [
      firstname,
      lastname,
      user_id,
    ])
    conn.commit()
    return { status: true, message: "อัปเดตบัญชีสำเร็จ" }
  } catch (err) {
    conn.rollback()
    return {
      status: false,
      message: err.toString(),
    }
  } finally {
    conn.release()
  }
}

const deleteTokens = async (user_id) => {
  await pool.query("DELETE FROM tokens WHERE user_id = ? ", [user_id])
}

const selectUserByPhone = async (phone, password) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    const [[user]] = await conn.query(
      "SELECT id, phone, password FROM users WHERE phone = ?",
      [phone]
    )

    if (!user) {
      return { status: false, message: "ไม่มีเบอร์นี้ในระบบ" }
    } else if (!(await bcrypt.compare(password, user.password))) {
      return { status: false, message: "รหัสผ่านผิด" }
    } else {
      const [[tokens]] = await conn.query(
        "SELECT token FROM tokens WHERE user_id = ?",
        [user.id]
      )
      let token
      if (tokens) {
        token = tokens.token
      } else {
        token = null
      }
      if (!token) {
        token = jwt.sign(user.phone, process.env.TOKEN_KEY)
        await conn.query("INSERT INTO tokens(token, user_id) VALUES (?, ?)", [
          token,
          user.id,
        ])
      }

      conn.commit()
      return {
        status: true,
        message: "ลงชื่อเข้าใช้งานสำเร็จ",
        token: token,
      }
    }
  } catch (err) {
    conn.rollback()
    // res.status(400).json(err.toString())
    return {
      status: false,
      message: err.toString(),
    }
  } finally {
    conn.release()
  }
}

const checkPhone = async (phone) => {
  const [rows, _] = await pool.query(
    "SELECT phone FROM users WHERE phone = ?",
    [phone]
  )
  return rows
}

const addUser = async (phone, password_encrypted) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    await conn.query("INSERT INTO users(phone, password) VALUES (?, ?)", [
      phone,
      password_encrypted,
    ])
    conn.commit()
    // res.json({ status: true, message: "ลงทะเบียนสำเร็จ" })
    return {
      status: true,
      message: "ลงทะเบียนสำเร็จ",
    }
  } catch (err) {
    conn.rollback()
    // res.status(400).json(err.toString())
    return {
      status: false,
      message: err.toString(),
    }
  } finally {
    conn.release()
  }
}

module.exports = {
  updateUserPass,
  updateUserProfile,
  deleteTokens,
  selectUserByPhone,
  checkPhone,
  addUser,
}
