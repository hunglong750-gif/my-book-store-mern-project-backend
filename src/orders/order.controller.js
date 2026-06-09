const Order = require("./order.model")

const createAOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body)
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json({message:"Fail to create order"})
    }
}

const getOrderByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        const orders = await Order.find({email}).sort({createdAt: -1})
        if(!orders || orders.length === 0) {
            return res.status(404).json({message:"Order not found"})
        }
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({message:"Fail to fetch order"})
    }
}

module.exports = {
    createAOrder,
    getOrderByEmail
}