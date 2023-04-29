const mongoose = require("mongoose")

const orderModel = mongoose.model("order", mongoose.Schema({
    user: { type: String },
    restaurant: { type: String },
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    status: {
        type: String,
        default: "Placed"
    }
}))


module.exports = { orderModel }