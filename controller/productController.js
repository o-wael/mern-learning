const Product = require("../models/product")

const addProduct = async (req, res) => {
    const {

        name,
        description,
        category,
        price,

    } = req.body
    try {
        
        if (!name || !description || !category || !price )
        throw Error('All fields must be filled')

        const product = await Product.create({
            name,
            description,
            category,
            price
        })

        res.status(200).json({
            product
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}
const editProduct = async (req, res) => {
    const {
        _id,
        name,
        description,
        category,
        price,

    } = req.body
    try {
        
        if (!name || !description || !category || !price || !_id)
        throw Error('All fields must be filled')

        var productFound = await Product.findById({_id})
        if(!productFound)
            throw Error('Product not found enter a right id')

        var product = await Product.findByIdAndUpdate({_id}
            ,{
            name,
            description
            ,category
            ,price
        })

        res.status(200).json({
            product
        })

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}
const editPrice = async (req, res) => {
    const {
        _id,
        price,

    } = req.body
    try {
        
        if (!_id || !price )
        throw Error('All fields must be filled')

        var productFound = await Product.findById({_id})
        if(!productFound)
            throw Error('Product not found enter a right id')

        var product = await Product.findByIdAndUpdate({_id},{price})

        res.status(200).json({
            product
        })
        
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}
const editAvailability = async (req, res) => {
    const {
        _id,
        available
    } = req.body
    try {
        
        if (!_id || !available)
        throw Error('All fields must be filled')

        var productFound = await Product.findById({_id})
        if(!productFound)
            throw Error('Product not found enter a right id')

        var product = await Product.findByIdAndUpdate({_id},{available})

        res.status(200).json({
            product
        })
        
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}
const addDiscount = async (req, res) => {
    const {
        _id,
        percentage
    } = req.body
    try {
        
        if (!_id || !percentage)
        throw Error('All fields must be filled')

        var productFound = await Product.findById({_id})
        if(!productFound)
            throw Error('Product not found enter a right id')
        
        if(productFound.discounted)
            throw Error('Product is already Discounted cancel discount and try again ')

        var product = await Product.findByIdAndUpdate({_id},{discountPercentage :percentage})

        res.status(200).json({
            product
        })
        
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}
const applyDiscount = async (req, res) => {
    const {
        _id,

    } = req.body
    try {
        
        if (!_id)
        throw Error('All fields must be filled')

        var productFound = await Product.findById({_id})
        if(!productFound)
            throw Error('Product not found enter a right id')
        
        const newPrice = productFound.price - productFound.price*(productFound.discountPercentage/100) 
        
        var product = await Product.findByIdAndUpdate({_id},{
            price : newPrice,
            discounted : true,
        })

        res.status(200).json({
            product
        })
        
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const cancelDiscount = async (req, res) => {
    const {
        _id,
    } = req.body
    try {
        
        if (!_id)
        throw Error('All fields must be filled')

        var productFound = await Product.findById({_id})
        if(!productFound)
            throw Error('Product not found enter a right id')
        if(!productFound.discounted)
            throw Error('Product is not Discounted')
        
        const newPrice = (productFound.price /(100-productFound.discountPercentage)*100)
        
        var product = await Product.findByIdAndUpdate({_id},{
            price : newPrice,
            discounted : false,
        })

        res.status(200).json({
            product
        })
        
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

module.exports = {
    addProduct,
    editProduct,
    editPrice,
    editAvailability,
    addDiscount,
    applyDiscount,
    cancelDiscount

  };