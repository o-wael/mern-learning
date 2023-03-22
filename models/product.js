const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({

    name: {
        type: String,
        required: 'Name is required',
        unique: true
    },
    description: {
        type: String,
        required: 'Product Descrption is required',
    },
    category: {
        type: String,
        enum: ['Hoodie', 'T-Shirt', 'Pants', 'Other'],
        required: 'Category is required',
    },
    price: {
        type: Number,
        required: 'Price is required',
    },
    available: {
        type: Boolean,
        default: false,
    },
    discounted: {
        type: Boolean,
        default: false,
    },
    discountPercentage: {
        type: Number,
        default: 0,
    },



   
}, {
    timestamps: true
})



module.exports = mongoose.model('product',productSchema)