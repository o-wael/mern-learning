const express = require('express')
const { addProduct, editProduct, editPrice, editAvailability, addDiscount, applyDiscount, cancelDiscount } = require('../controller/productController')


const router = express.Router()

router.post('/', addProduct)

 router.post('/editProduct', editProduct)

 router.post('/editPrice', editPrice)

 router.post('/editAvailability', editAvailability)

 router.post('/addDiscount', addDiscount)

 router.post('/applyDiscount', applyDiscount)

 router.post('/cancelDiscount', cancelDiscount)


module.exports = router