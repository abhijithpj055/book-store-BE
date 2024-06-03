import mongoose from'mongoose'
// require('dotenv').config()
import dotenv from 'dotenv'
dotenv.config()

export const connectDb= async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Mongodb connected")
    } catch (error) {
        console.log(error)
    }
    
}
