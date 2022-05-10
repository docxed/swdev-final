require("dotenv").config()
const colors = require("colors")
const express = require("express")
const app = express()
const cors = require("cors")
const { logger } = require("../middlewares")

app.use(cors())
app.use(logger)

app.use(express.static("static"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Router
const userRouter = require("../routes/users")
const reserveRouter = require("../routes/reserve")

// Router Using
app.use(userRouter.router)
app.use(reserveRouter.router)

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server is started and Connected to port ${port}`.rainbow)
})

export default app
