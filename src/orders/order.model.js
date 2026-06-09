const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    address: {
        street: {
            type: String,
            require: true,
        },
        city: {
            type: String,
            requite: true,
        },
        country: {
            type: String,
            require: true,
        },
        state: String,
        zipcode: {
            type: String,
            require: true,
        }
    },
    phone: {
        type: Number,
        require: true,
    },
    products: [
        {
            productIDs: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                require: true
            },
            quantity: {
                type: Number,
                require: true,
                default: 1
            }
        }
    ],
    price: {
        type: Number,
        require: true,
    }
}, {
    timestamps: true,
})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order;