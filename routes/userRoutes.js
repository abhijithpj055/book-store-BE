import express from 'express'
import { signin,signup } from '../controllers/userController.js'
import { getBooks } from '../controllers/bookController.js'
import { addToCart, removeFromCart } from '../controllers/cartController.js'
import { placeOrder } from '../controllers/orderController.js'

const userRouter = express.Router()

userRouter.post('/signup',signup)
userRouter.post('/signin',signin)
userRouter.get('/get-books',getBooks)
userRouter.post('/add-to-cart',addToCart)
userRouter.delete('/remove-from-cart/:id',removeFromCart)
userRouter.post('/place-order',placeOrder)

export default userRouter
