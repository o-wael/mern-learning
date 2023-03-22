const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      products: 
      [
        {
          product_id: mongoose.Schema.Types.ObjectId,
          quantity: Number,

        }
      ],
    price: {
        type: Number,
        required: "Order can't exist with no price"
      },
    status: {//TODO
        type: String,
        enum: ['Pending', 'Being Shipped', 'Completed', 'Canceled'],
        default : "Pending"
      },

}, {
    timestamps: true
})

orderSchema.statics.createOrder = async function (user_id, products, price, status) {
    
  const order = await this.create({
        user_id,
        products,
        price,
        status
    })

    return order
}

orderSchema.statics.completeOrder = async function (user_id) {
  const orderExists = await this.findOne({
    user_id,
    status : "Being Shipped"
  })

  if (!orderExists) {
    throw new Error('Order not found')
  }

  const order = await this.findOne({
      user_id,
      status : "Being Shipped"
   })

   order.status = "Completed"
    await order.save()
    return order
}

orderSchema.statics.shipOrder = async function (user_id, price) {
  const orderExists = await this.findOne({
    user_id,
    status : "Pending"
  })

  if (!orderExists) {
    throw new Error('Order not found')
  }

  const order = await this.findOne({
      user_id,
      status : "Pending"
    })

    order.price = price
    order.status = "Being Shipped"
    await order.save()
    return order
}

orderSchema.statics.updateOrder = async function (user_id, products, price, status) {

  const orderExists = await this.findOne({
    user_id,
    status : "Pending"
  })

  if (!orderExists) {
    throw new Error('Order not found')
  }

  const order = await this.findOne({
      user_id,
      status : "Pending"
   })

   order.products = products
    order.price = price
    order.status = status

   await order.save()
   return order
}

orderSchema.statics.deleteOrder = async function (user_id, products, price) {
  const orderExists = await this.findOne({
    user_id,
    status : "Pending"
  })

  if (!orderExists) {
    throw new Error('Order not found')
  }

  const order = await this.findOne({
      user_id,
      products,
      price
    })

  order.status = "Canceled"
  await order.save()
  return order
}

orderSchema.statics.getOrder = async function (user_id, products, price) {
  const order = await this.find({
    user_id,
    products,
    price,
    status : "Completed"
  })

  if(!order)
    throw Error ("This order doesn't exist")

  return order
}

orderSchema.statics.getOrders = async function (user_id) {
  const orders = await this.find({
    user_id
  })

  if(!orders)
    throw Error ("This user doesn't have any orders")

  return orders
}

module.exports = mongoose.model('order',orderSchema)