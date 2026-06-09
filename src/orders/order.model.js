const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        state: String,
        zipcode: {
            type: String,
            required: true,
        }
    },
    phone: {
        type: Number,
        required: true,
    },
    products: [
        {
            productIDs: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    price: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order;