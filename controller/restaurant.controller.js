const { restaurantModel } = require("../models/restaurant.model")

const addRestaurant = async (req, res) => {
    const { name, address } = req.body
    try {
        const submitData = new restaurantModel({ name, address })
        await submitData.save()
        res.status(201).json({ msg: "Restaurant added successfuly" })
    } catch (error) {
        if (error) {
            res.status(500).json({ result: false, error: error, msg: "Soryy we are offlien" })
        }
    }


}

const allRestaurants = async (req, res) => {
    const response = await restaurantModel.find()
    res.status(200).json(response)
}

const findRestaurant = async (req, res) => {
    const { id } = req.params

    const response = await restaurantModel.findById({ _id: id })
    res.status(200).json(response)
}

const addMenu = async (req, res) => {
    const { id } = req.params
    const { name, description, price, image } = req.body
    const menu = {
        name,
        description,
        price,
        image
    }
    // console.log(id, menu);
    try {
        const restaurant = await restaurantModel.findOne({ _id: id })

        if (restaurant) {
            restaurant.menu.push(menu)
            await restaurant.save()
            return res.status(200).json({ result: true, msg: "Menu added", restaurant })

        } else {
            res.status(500).json({ result: false, msg: "Restaurant not found" })
        }
    } catch (err) {

    }

}


const getMenu = async (req, res) => {
    const { id } = req.params
    const restaurant = await restaurantModel.findById({ _id: id })
    if (restaurant) {
        res.status(200).json({ result: true, name: restaurant.name, menu: restaurant.menu })
    } else {
        res.status(500).json({ result: false, msg: "Restaurant not found" })
    }
    // console.log(restaurant);
}

const deleteMenu = async (req, res) => {
    const menuId = req.params.menu_id;
    const restaurant = await restaurantModel.findOne({ _id: req.params.id });
    if (restaurant) {
        const menuIndex = restaurant.menu.findIndex((item) => item._id == menuId);
        if (menuIndex === -1) {
            return res.send({ error: "Menu item not found" });
        }
        restaurant.menu.splice(menuIndex, 1);
        await restaurant.save();
        res.status(202).json({ result: true, msg: "Deleted Succfully" });
    } else {
        res.status(400).json({ error: "Restaurent Not found" })
    }
}


module.exports = { addRestaurant, allRestaurants, findRestaurant, addMenu, getMenu, deleteMenu }