const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')
const {createPaymentIntent} = require("./controllers/stripe")
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express()

app.use(morgan("dev"))
app.use(bodyParser.json({limit:"2mb"}))
app.use(cors())

// app.use("/api", authRoutes)
// fs.readdirSync("./routes").map(r => app.use("/api",require("./routes/" + r)));
// app.get("/create-payment-intent", (req, res) => {
//     res.send({
//         create:"create - payment"
//     })
// })
app.get("/create-payment-intent", createPaymentIntent)
app.post("/create-payment-intent", createPaymentIntent)

app.get("/", (req, res) => {
    res.send({
        send:"yessir"
    })
})

app.post("/payments/create", async (req, res) => {
    // const total = req.query.total

    // console.log("total boi -->", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 100*100,
        currency: "usd",
    })

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));