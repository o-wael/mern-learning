const express = require('express')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config() 


const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')
const cartRouter = require('./routes/cartRouter')
//const orderRouter = require('./routes/orderRouter')

//express app

const app = express()

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: false
})); // Parses urlencoded bodies
app.use(bodyParser.json());



app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
    //print every request on the console
})

//routes
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)
//app.use('/order', orderRouter)

// connect db and listen to requests
const port = process.env.PORT ;
const conn =  process.env.MONGO_URI;
mongoose.connect(conn)
    .then(() => {
        app.listen(port, () => {
            console.log('connected to db & the server is listening on', port)
        })
    })
    .catch((error) => {
        console.log(error)
    })

