const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express()

app.use(morgan("dev"))
app.use(bodyParser.json({limit:"2mb"}))
app.use(cors())

app.get("/", (req, res) => {
    res.send({
        send:"yessir"
    })
})
app.post("/create-payment-intent", async (req, res) => {
    const total = req.body
    let _total = total.total/20
   
    const paymentIntent = await stripe.paymentIntents.create({
        amount:_total * 100,
        currency:"usd"
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    })
    
})

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));