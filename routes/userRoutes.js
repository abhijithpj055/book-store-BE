import express from 'express'
import { checkUser, getUserInfo, signin,signup } from '../controllers/userController.js'
import { getBookbyId, getBooks } from '../controllers/bookController.js'
import { addToCart, removeFromCart } from '../controllers/cartController.js'
import { placeOrder } from '../controllers/orderController.js'

const userRouter = express.Router()
userRouter.get('/',(req,res)=>{

    res.send("Hitted")
})
userRouter.post('/signup',signup)
userRouter.post('/signin',signin)
userRouter.get('/check-user',checkUser)
userRouter.get('/user-info',getUserInfo)
userRouter.get('/get-books',getBooks)
userRouter.get('/get-book-by-id/:id',getBookbyId)
userRouter.post('/add-to-cart',addToCart)
userRouter.delete('/remove-from-cart/:id',removeFromCart)
userRouter.post('/place-order',placeOrder)

export default userRouter
