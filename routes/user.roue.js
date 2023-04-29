const express = require("express")
const { register, login, resetPassword } = require("../controller/user.controller")
const { authorization } = require("../middlewares/user.middleware")

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.patch("/user/:id/reset", authorization, resetPassword)

module.exports = { userRouter }