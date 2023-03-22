const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      products: 
      [
        {
          product_id: mongoose.Schema.Types.ObjectId,
          quantity: Number,
          //name: String,
          //price: Number
        }
      ],

   
}, {
    timestamps: true
})





module.exports = mongoose.model('cart',cartSchema)