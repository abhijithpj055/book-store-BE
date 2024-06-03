import Admin from "../models/adminModel.js";
import { adminToken } from "../utils/generateToken.js";
import bcrypt from 'bcrypt'

//Admin Signup

export const signup=async(req,res)=>{
    try {
        const{name,email,password}=req.body;

        const adminExist =await Admin.findOne({email})
        if(adminExist){
            return res.send("Admin already exist")
        }
    
        const saltRounds=10;
        const hashPassword=await bcrypt.hash(password,saltRounds)
        const newAdmin=new Admin({
            name,
            email,
            hashPassword,
            role:"admin"
        })
    
    await newAdmin.save()
    
    if(!newAdmin){
        res.send("Admin is not created")
    }
    const token=adminToken(newAdmin)
    res.cookie("token",token)
    res.send("Signed In Successfully")
     
    } catch (error) {
        console.log(error,"Something went to wrong")
    }
    
}

//Admin signin

export const signin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const admin=await Admin.findOne({email})
        if(!admin){
            res.send("Admin is not found")
        }
        const matchPassword= await bcrypt.compare(password,admin.hashPassword)
        if(!matchPassword){
            res.send("Incorrect Password")
        }

        const token=adminToken(admin)
        res.cookie("token",token)
        res.send("Logged in succesfully")
    } catch (error) {
     console.log(error);
     res.status(500).send("Internal sever error")   
    }
}


