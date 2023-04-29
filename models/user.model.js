const mongooose = require("mongoose")

const UserRegisterModel = mongooose.model("user", mongooose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String,
    },
}))



module.exports = { UserRegisterModel }