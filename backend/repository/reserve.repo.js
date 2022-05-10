const pool = require("../config/database")

const add = async (
  pre,
  fname,
  lname,
  sex,
  born,
  card,
  idcard,
  phone,
  lineid,
  email,
  location,
  reserveDate,
  user_id
) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    await conn.query(
      `INSERT INTO reserve(pre, fname, lname, sex, born, card, idcard, phone, lineid, email, location, reserveDate, user_id) VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pre,
        fname,
        lname,
        sex,
        born,
        card,
        idcard,
        phone,
        lineid,
        email,
        location,
        reserveDate,
        user_id,
      ]
    )
    conn.commit()
    // res.json({ status: true, message: "ลงทะเบียนสำเร็จ" })
    return {
      status: true,
      message: "ลงทะเบียนจองวัคซีนสำเร็จ",
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

const getByMy = async (user_id) => {
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    const [reserve] = await conn.query(
      `SELECT * FROM reserve WHERE user_id = ?`,
      [user_id]
    )
    conn.commit()
    // res.json({ status: true, message: "ลงทะเบียนสำเร็จ" })
    return {
      status: true,
      message: "เรียกข้อมูลสำเร็จ",
      reserve: reserve,
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
  add,
  getByMy,
}
