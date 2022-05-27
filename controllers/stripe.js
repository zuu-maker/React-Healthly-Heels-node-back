const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.createPaymentIntent = async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount:100 * 100,
        currency:"usd"
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    })
    
}


