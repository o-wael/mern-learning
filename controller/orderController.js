/*const Order = require('../models/order')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const { addProductToCart, removeProductFromCart, calculateCartCost} = require('../controller/cartController')


const createOrder = async (req, res) => {
    const {
        user_id
    } = req.body
    try {
        if (!user_id)
            throw Error('All fields must be filled')

        const price = calculateCartCost(user_id)
        let cart = await Cart.findOne({user_id});
        const products = cart.products;
        const order = await Order.createOrder(user_id, products, price, "Pending")
        res.status(200).json({
            order
        })
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const updateOrder = async (req, res) => {
    const {
        user_id,
        products,
        price,
        status
    } = req.body
    try {
        if (!user_id || !products || !price || !status)
            throw Error('All fields must be filled')
        const order = await Order.updateOrder(user_id, products, price, status)
        res.status(200).json({
            order
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const shipOrder = async (req, res) => {
    const {
        user_id
    } = req.body
    try {
        if (!user_id)
            throw Error('All fields must be filled')

        const price = Cart.calculateCartCost
        
        const order = await Order.shipOrder(user_id, price)
        res.status(200).json({
            order
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const completeOrder = async (req, res) => {
    const {
        user_id
    } = req.body
    try {
        if (!user_id)
            throw Error('All fields must be filled')
        
        const order = await Order.completeOrder(user_id)
        res.status(200).json({
            order
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const deleteOrder = async (req, res) => {
    const {
        user_id,
        products,
        price
    } = req.body
    try {
        if (!user_id || !products || !price)
            throw Error('All fields must be filled')
        const order = await Order.deleteOrder(user_id, products, price)
        res.status(200).json({
            order
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const getOrdersForUser = async (req, res) => {
    const {
        user_id
    } = req.body
    try {
        if (!user_id)
            throw Error('All fields must be filled')

        const orders = await Order.getOrders(user_id)
        res.status(200).json({
            orders
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const getOrder = async (req, res) => {
    const {
        user_id,
        products,
        price
    } = req.body
    try {
        if (!user_id || !products || !price)
            throw Error('All fields must be filled')
        
        const order = await Order.getOrder(user_id, products, price)
        res.status(200).json({
            order
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    getOrdersForUser,
    completeOrder,
    shipOrder
}*/