const express = require("express")
const { newOrder, myOrder } = require("../controller/order.controller")
const { authorization } = require("../middlewares/user.middleware")

const orderRoute = express.Router()


orderRoute.post("/", authorization, newOrder)
orderRoute.get("/:id", myOrder)

module.exports = { orderRoute }