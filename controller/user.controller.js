
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserRegisterModel } = require("../models/user.model")
require("dotenv").config()

const register = async (req, res) => {
    try {
        const { name, email, password, address } = req.body
        // const address = {
        //     street,
        //     city,
        //     state,
        //     country,
        //     zip
        // }
        bcrypt.hash(password, 7, async (err, hashed) => {

            try {
                const submitData = new UserRegisterModel({ name, email, password: hashed, address })
                await submitData.save()
                res.status(201).json({ msg: "Signup successful" })
            } catch (error) {
                if (error.code == 11000) {
                    res.status(400).json({ result: false, error: error.keyValue, msg: "User Allready exists" })
                }
            }
        })
    } catch (err) {
        res.send({ result: false, msg: "Signup failed" })
        console.log(err);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserRegisterModel.findOne({ email })
        if (user) {

            bcrypt.compare(password, user.password, (err, valid) => {
                if (valid) {

                    const jwtToken = jwt.sign({ email: user.email }, process.env.JWT_KEY)
                    // res.cookie("token", `${jwtToken}`, { maxAge: 900000000, secure: true })
                    res.status(200).json({ result: true, msg: "Login successful", token: `Bearer ${jwtToken}` })

                } else {
                    return res.status(500).json({ result: false, msg: "Wrong Password" })

                }



            })
        } else {
            res.status(500).json({ result: false, msg: "User not found" })
        }

    } catch (err) {
        res.status(400).json({ result: false, msg: "Somthing went wrong" })
        console.log(err);
    }
}

const resetPassword = async (req, res) => {
    const { oldPassword, newPassword, userId } = req.body
    const thisUserid = req.params.id
    // 
    try {
        const user = await UserRegisterModel.findOne({ _id: thisUserid })
        if (user) {
            if (user.email != userId) {
                return res.status(500).json({ result: false, msg: "You are not authorized" })

            }
            bcrypt.compare(oldPassword, user.password, (err, valid) => {


                if (!valid) {
                    return res.status(500).json({ result: false, msg: "Wrong Password" })
                }

                // res.cookie("token", `${jwtToken}`, { maxAge: 900000000, secure: true })

                bcrypt.hash(newPassword, 7, async (err, hashed) => {

                    try {
                        await UserRegisterModel.findOneAndUpdate({ _id: thisUserid }, { password: hashed })

                        res.status(201).json({ msg: "Password reset successful" })
                    } catch (error) {
                        console.log(error);
                        res.status(400).json({ result: false, error: error.keyValue, msg: "Something went wrong" })

                    }
                })



            })
        } else {
            res.status(500).json({ result: false, msg: "User not found" })
        }

    } catch (err) {
        res.status(400).json({ result: false, msg: "Somthing went wrong" })
        console.log(err);
    }
}

module.exports = { register, login, resetPassword }