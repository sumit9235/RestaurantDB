const express=require("express");
require('dotenv').config();
const app=express();
const cors=require('cors');
const {userRouter}=require("./routes/user.routes.js");
const {orderRouter}=require("./routes/order.route.js");
const { restaurantRouter}=require("./routes/restaurant.route.js")
const {auth}=require("./controller/authenticate.js");
const {connection}=require('./config/db.js');
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).send("Home page");
})

app.use("/api",userRouter);
app.use(auth)
app.use("/api",restaurantRouter);
app.use("/api",orderRouter);

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to Database");
    } catch (err) {
        console.log(err.message);
    };
    console.log("Conected to Server");
})

