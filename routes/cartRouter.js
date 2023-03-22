const express = require('express')
const { addProductToCart, removeProductFromCart, calculateCartCost, checkout } = require('../controller/cartController')


const router = express.Router()

router.post('/', addProductToCart)

router.post('/remove', removeProductFromCart)

router.post('/getCartPrice', calculateCartCost)

router.post('/checkout', checkout)



module.exports = router