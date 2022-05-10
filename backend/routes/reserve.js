const config = process.env
const express = require("express")
const pool = require("../config/database")
const Joi = require("joi")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { isLoggedIn } = require("../middlewares")
const { raw } = require("express")

const { addReserve, getReserve } = require("../controllers/reserve.controller")

router = express.Router()

router.post("/reserve/add", isLoggedIn, addReserve)
router.get("/reserve/selectByMy", isLoggedIn, getReserve)

exports.router = router
