const config = process.env
const pool = require("../config/database")
const Joi = require("joi")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {
  updateUserPass,
  updateUserProfile,
  deleteTokens,
  selectUserByPhone,
  checkPhone,
  addUser,
} = require("../repository/user.repo")

const changepasswordSchema = Joi.object({
  oldpassword: Joi.string().required().min(5).max(20),
  password: Joi.string().required().min(5).max(20),
  c_password: Joi.string().required().valid(Joi.ref("password")),
})

const changepassword = async (req, res) => {
  try {
    await changepasswordSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.json({ status: false, message: err.message })
  }

  const { oldpassword, password } = req.body
  const user_id = req.user.id

  try {
    const response = await updateUserPass(oldpassword, password, user_id)

    if (response) {
      res.json({
        status: response.status,
        message: response.message,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const profileSchema = Joi.object({
  firstname: Joi.string().required().max(100),
  lastname: Joi.string().required().max(100),
  phone: Joi.string()
    .required()
    .min(10)
    .max(10)
    .pattern(/^[0-9]+$/),
  lineid: Joi.string().max(100),
})

const updateProfile = async (req, res) => {
  try {
    await profileSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.json({ status: false, message: err.message })
  }

  try {
    const { firstname, lastname } = req.body
    const user_id = req.user.id
    const response = await updateUserProfile(firstname, lastname, user_id)

    if (response) {
      res.json({
        status: response.status,
        message: response.message,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const logout = async (req, res) => {
  await deleteTokens(req.user.id)
  res.json({ status: true, message: "ลงชื่อออกสำเร็จ" })
}

const getProfile = async (req, res) => {
  res.json(req.user)
}

const signinSchema = Joi.object({
  phone: Joi.string().required().max(10),
  password: Joi.string().required().min(5).max(20),
})

const signin = async (req, res) => {
  try {
    await signinSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.json({ status: false, message: err.message })
  }

  try {
    const { phone, password } = req.body
    const response = await selectUserByPhone(phone, password)

    if (response) {
      res.json({
        status: response.status,
        message: response.message,
        token: response.token,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const phoneValidator = async (value, helpers) => {
  const response = await checkPhone(value)

  if (response.length > 0) {
    const message = "เบอร์โทรนี้ลงทะเบียนใช้งานแล้ว"
    throw new Joi.ValidationError(message, { message })
  }
  return value
}

const signupSchema = Joi.object({
  phone: Joi.string().required().max(10).external(phoneValidator),
  password: Joi.string().required().min(5).max(20),
  c_password: Joi.string().required().valid(Joi.ref("password")),
})

const signup = async (req, res) => {
  try {
    await signupSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.json({ status: false, message: err.message })
  }

  try {
    const { phone, password } = req.body
    const password_encrypted = await bcrypt.hash(password, 5)
    const response = await addUser(phone, password_encrypted)
    if (response) {
      res.json({ status: response.status, message: response.message })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

module.exports = {
  changepassword,
  updateProfile,
  logout,
  getProfile,
  signin,
  signup,
}
