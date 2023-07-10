const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: { type: String },
    restaurant: { type: String},
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
    status: String 
}, {
    versionKey: false
}
)

const OrderModel = mongoose.model("order", orderSchema)

module.exports = { OrderModel }