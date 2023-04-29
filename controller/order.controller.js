const { orderModel } = require("../models/order.model");

const newOrder = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { restaurant, items, deliveryAddress } = req.body;
        const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const order = new orderModel({
            user: userId,
            restaurant: restaurant,
            items,
            totalPrice,
            deliveryAddress,
            status: 'placed',
        });

        await order.save();
        res.send("Your Order Has Been Placed");
    } catch (error) {
        console.error(error);
        res.json({ error: 'Problem with create order' });
    }
}

const myOrder = async (req, res) => {
    const { id } = req.params
    const response = await orderModel.findById({ _id: id })
    res.status(200).json(response)
}

module.exports = { newOrder, myOrder }