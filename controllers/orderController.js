import User from "../models/userModel.js"
import Order from '../models/orderModel.js'

export const placeOrder=async(req,res)=>{
    try {
        const {id}=req.headers;
        const {order}=req.body;
        for (const orderData of order){
            const newOrder =new Order({user:id,book:orderData._id})
            const orderDataFromDb=await newOrder.save();
            //saving order in user model
            await User.findByIdAndUpdate(id,{
                $push:{orders:orderDataFromDb._id},
            })
            //clearing cart
            await User.findByIdAndUpdate(id,{
                $pull:{cart:orderData._id},
            })
        }
        return res.json({
            status:"Success",
            message:"Order Placed Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"An error occured"})
    }
}

//get order history of partiular user

export const getOrderHistory=async(req,res)=>{
    try {
        const {id}=req.headers;
        const userData=await User.findById(id).populate({
            path:"orders",
            populate:{path:"book"},
        })

        const orderData=userData.orders.reverse();
        return res.json({
            status:"Success",
            data:orderData,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"An error occured"})
    }
}

//get all orders-admin
export const getAllOrders=async(req,res)=>{
    try {
        const userData=await Order.find().populate({
            path:"Book",
        })
        .populate({
            path:"User",
        })
        .sort({createdAt:-1})

        return res.json({
            status:"Success",
            data:userData,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occured"})
    }
}

//update order-admin

export const updateOrder=async(req,res)=>{
    try {
        const {id}=req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status})
        return res.json({status:"Success",message:"Status Updated Successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occured"})
    }
}