const config = process.env
const pool = require("../config/database")
const Joi = require("joi")

const { add, getByMy } = require("../repository/reserve.repo")

const addReserve = async (req, res) => {
  try {
    const {
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
    } = req.body
    const user_id = req.user.id
    const response = await add(
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
    )
    if (response) {
      res.json({ status: response.status, message: response.message })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

const getReserve = async (req, res) => {
  try {
    const user_id = req.user.id
    const response = await getByMy(user_id)
    if (response) {
      res.json({
        status: response.status,
        message: response.message,
        reserve: response.reserve,
      })
    } else {
      res.status(400).json(response.message)
    }
  } catch (err) {
    res.status(400).json(err.toString())
  }
}

module.exports = {
  addReserve,
  getReserve,
}
