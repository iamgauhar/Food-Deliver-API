const mongoose = require("mongoose")

const restaurantModel = mongoose.model("restaurant", mongoose.Schema({


    name: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    menu: [{

        name: String,
        description: String,
        price: Number,
        image: String
    }]

}))

module.exports = { restaurantModel }