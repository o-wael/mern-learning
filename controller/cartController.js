const Cart = require("../models/cart");
const Product = require("../models/product");
const Order = require("../models/order");

const addProductToCart = async (req, res) => {
    const {

        user_id,
        product_id,
        quantity,

    } = req.body
    try {
        
        if (!user_id || !product_id || !quantity)
            throw Error('All fields must be filled')

        let cart = await Cart.findOne({user_id});

        if(cart){
            //cart exists for user
            let itemIndex = cart.products.findIndex(p => p.product_id == product_id);

            if (itemIndex > -1){
                //product exists in cart

                let productItem = cart.products[itemIndex];
                productItem = cart.products[itemIndex];
                productItem.quantity = ~~quantity + ~~productItem.quantity
                cart.products[itemIndex] = productItem;
            } else{
                // product not in cart
                cart.products.push({
                    product_id,
                    quantity,
                })
            }

            cart = await cart.save()
            return res.status(201).send(cart)

        } else{
            // user has no cart
            const newCart = await Cart.create({
                user_id,
                products:[{
                    product_id,
                    quantity,
                }]
            })
            
            return res.status(201).send(newCart);
        }



    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}
const removeProductFromCart = async (req, res) => {
    const {

        user_id,
        product_id,

    } = req.body
    try {
        
        if (!user_id || !product_id)
            throw Error('All fields must be filled')

        let cart = await Cart.findOne({user_id});

        if(!cart)
            throw Error('Cart not found')


            //cart exists for user
            let itemIndex = cart.products.findIndex(p => p.product_id == product_id);


            if (itemIndex > -1){
                //product exists in cart

                cart.products.splice(itemIndex, 1)
                cart = await Cart.findOneAndUpdate({user_id}, { products : cart.products })
            } else{
                // product not in cart
                throw Error('Product not found')
            }

            cart = await cart.save()
            return res.status(201).send(cart)




    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const calculateCartCost = async (req, res) => {
    const {
        user_id
    } = req.body
    try {
        
        if ( !user_id )
            throw Error('All fields must be filled')

        let cart = await Cart.findOne({user_id});

        if(!cart)
            throw Error('Cart not found')


            //cart exists for user
            var price = 0;

            for (let i = 0; i < cart.products.length ; i++) {

                let product = await Product.findById({ _id : cart.products[i].product_id})
                
                price = price + (product.price * cart.products[i].quantity)

              }


            return res.status(201).send({price})




    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// We need to add here the checkout method
const checkout = async (req, res) => {
    const {

        user_id,

    } = req.body
    try {

        if ( !user_id )
            throw Error('All fields must be filled')
        
        let cart = await Cart.findOne({user_id});

        if(!cart)
            throw Error('Cart not found')
        
        var price = 0;

        for (let i = 0; i < cart.products.length ; i++) {

            let product = await Product.findById({ _id : cart.products[i].product_id})
            
            price = price + (product.price * cart.products[i].quantity)

          }

        const products = cart.products

        const order = Order.createOrder(user_id, products, price, "Pending")

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

    addProductToCart,
    removeProductFromCart,
    calculateCartCost,
    checkout

  };