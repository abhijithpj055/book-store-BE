import express from 'express'
import { checkAdmin, signin,signup } from '../controllers/adminController.js'
import { addBooks, deleteBook, getBooks, updateBook } from '../controllers/bookController.js'
import { deleteUser, getUser } from '../controllers/userController.js'
import upload from '../middlewares/upload-middleware.js'
import { getUserCart } from '../controllers/cartController.js'
import { getAllOrders, getOrderHistory, updateOrder } from '../controllers/orderController.js'

const adminRouter = express.Router()

adminRouter.post('/signup',signup)
adminRouter.post('/signin',signin)
adminRouter.get('/check-admin',checkAdmin)

adminRouter.get('/get-books',getBooks)
adminRouter.get('/get-users',getUser)
adminRouter.delete('/delete-user/:id',deleteUser)

adminRouter.post('/add-books',upload.single("image"),addBooks)
adminRouter.put('/update-books/:id',updateBook)
adminRouter.delete('/delete-books/:id',deleteBook)

adminRouter.get('/get-usercart/:id',getUserCart)
adminRouter.get('/get-order-history/:id',getOrderHistory)
adminRouter.get('/get-all-orders',getAllOrders)
adminRouter.put('/update-order/:id',updateOrder)
export default adminRouter