const express = require("express")
const { connectDB } = require("./configs/db")
const { userRouter } = require("./routes/user.roue")
const { UserRegisterModel } = require("./models/user.model")
const { restaurantRouter } = require("./routes/restaurant.route")
const { orderRoute } = require("./routes/order.route")

const app = express()

app.use(express.json())
// app.use(express.Router())

app.use("/api", userRouter)
app.use("/api/restaurants", restaurantRouter)
app.use("/api/orders", orderRoute)

app.get("/", async (req, res) => {
    res.send("Welcome to my API")
})

app.listen(5000, async () => {
    try {
        await connectDB
        console.log("DB connected");
        console.log("on 5000");

    } catch (err) {
        console.log(err);

    }
})