import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import stripe from 'stripe'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express()
dotenv.config()
app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors())

// any url consisting '/posts' will be forwarded to postRoutes for handling
app.use('/posts', postRoutes)
app.use('/user', userRoutes)

// ********* MongoDB database user credentials*********
    // username : SR_DB
    // Password: dbPassword
// **************************************************** 

const STRIPE_PRIVATE_KEY = 'sk_test_51KdTt6EfiSQwq02aD6bdG4tjO5sOBdkQOrfC7jpWgOngiDzRbaTbF4X3HC0c2cdj9Y8ilSWW0ZPcejthzq3nHMtq00Wkf0fOX2'
const stripeKey = stripe(STRIPE_PRIVATE_KEY) 
const storeItems = new Map([
    [1, {priceInCents: 10000, name: "Rent fees"}],
])

//**************** Payment Gateway Api ******************/
app.post('/create-checkout-session',async (req, res)=>{
    try{
        const session = await stripeKey.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map((item)=>{
                const storeItem = storeItems.get(item.id)
                return{
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url:`http://localhost:3000/posts`,
            cancel_url:`http://localhost:3000/posts` , 

        })
        res.json({url: session.url})   
    }catch(e){
        res.status(500).json({error: e.message})
    }
})
// *****************************************************/


const PORT = process.env.PORT || 5000
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology:true})
.then(()=>{
    app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
})
.catch((error)=> console.log("Server falied to connect...",error.message))







