const express = require('express')
const orderRouter = express.Router()
const { OrderModel } = require('../model/order.model');

orderRouter.post("/orders", async (req, res) => {
    const id=req.body.id;
    const restaurantID=req.body.id
    const {user,restaurant,items,totalPrice,deliveryAddress,status} = req.body;
    try {
        const data = new OrderModel({user:id,restaurant:restaurantID,items,totalPrice,deliveryAddress,status});
        await data.save();
        res.status(201).send({ "msg": "Order Placed Sucessfull" });
    } catch (err) {
        res.status(500).send({ "err": err.message })
    }
})

orderRouter.get("/orders/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await OrderModel.findById(id);
        if (data) {
            res.status(200).send({ "msg": data })
        } else {
            res.send({ "msg": "No order found" })
        }
    } catch (err) {
        res.status(500).send({ "err": err.message })
    }
})


orderRouter.patch("/orders/:id",async(req,res)=>{
    const id=req.params.id;
    const status=req.body;
    try {
        await OrderModel.findByIdAndUpdate({_id:id},status);
        res.status(200).send({"msg":"Updated status"})
    } catch (err) {
        res.status(500).json({ "err": err.message })
    }
})

module.exports={
    orderRouter
}