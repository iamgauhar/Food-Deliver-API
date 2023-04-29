const express = require("express")
const { addRestaurant, allRestaurants, findRestaurant, addMenu, getMenu, deleteMenu } = require("../controller/restaurant.controller")

const restaurantRouter = express.Router()

restaurantRouter.post("/add", addRestaurant)
restaurantRouter.get("/", allRestaurants)
restaurantRouter.get("/:id", findRestaurant)
restaurantRouter.post("/:id/menu", addMenu)
restaurantRouter.get("/:id/menu", getMenu)
restaurantRouter.delete("/:id/menu/:menu_id", deleteMenu)

module.exports = { restaurantRouter }