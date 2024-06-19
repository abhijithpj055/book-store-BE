import express from 'express'
import { connectDb } from '../config/db.js'
import userRouter from '../routes/userRoutes.js'
import adminRouter from '../routes/adminRoutes.js'
import paymentRouter from '../routes/paymentRoutes.js'
import cors from 'cors'
const app=express()
const port=3000

app.use(express.json())
let corsOption={
  origin:'https://book-store-fe-one.vercel.app',
  credentials:true,
  optiomSuccessStatus:200
}

app.use(cors(corsOption))



connectDb()

app.get('/', (req, res) => {
    res.send('HOME PAGE')
  })

app.use('/api/v1/user',userRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/order',paymentRouter)
app.use('/api/v1/verify',paymentRouter)

  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })