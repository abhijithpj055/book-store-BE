import bcrypt from 'bcrypt'
import {generateToken} from'../utils/generateToken.js'
import User from '../models/userModel.js'


// user signup

export const signup=async(req,res)=>{
    try {
        const {firstName,lastName,email,password}= req.body;

        const userExist= await User.findOne({email})

        if(userExist){
            res.send("User already exist")
        }

        const saltRounds=10;
        const hashPassword= await bcrypt.hash(password,saltRounds)
        const newUser=new User({
            firstName,
            lastName,
            email,
            hashPassword,
        })
          await newUser.save()
          
        if(!newUser){
            res.send("User not created")
        }
    
        const token=generateToken(email)
        res.cookie("token",token)
        res.send("Signed Up Successfully")
        
    } catch (error) {
        console.log(error,"Something went to wrong")
        return res.status(500).send("Internal Sever Error")
        
    }
}


//user signin

export const signin= async(req,res)=>{

try {
    const {email,password}=req.body;
    const user=await User.findOne({email})
    if(!user){
        return res.send("User not exist")
    }

    const matchPassword=await bcrypt.compare(password,user.hashPassword)
    if(!matchPassword){
        res.send("Incorrect Password")
    }

    const token=generateToken(email)
    res.cookie(token)
    res.send("Login Successfully")
} catch (error) {
    console.log(error,"Something went to wrong")
    // res.status(500).send("Internal server error")
}
}


//get-user

export const getUser=async(req,res)=>{
    const users=await User.find();
    res.send(users)
}


//get-user-information

export const getUserInfo =async(req,res)=>{
    try {
        const {id} =req.headers;
        const data=await User.findById(id).select("password")
        return res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}


//delete user

// export const deleteUser=async(req,res)=>{
//     const id=req.params.id;

//     const deletedUser=await User.deleteOne({_id:id})
//     if(!deletedUser){
//         return res.send("User not deleted")
//     }
//     res.send("User deleted")
// }

export const deleteUser=async(req,res)=>{
    const id=req.params.id;
    const user=await User.find({_id:id})
    if(!user){
        return res.send("User not exist")
    }
    const remove=await User.deleteOne({_id:id})
    if(!remove){
        return res.send("Failed to remove")
    }
    return res.send("Removed Successfully")
}

//check user

export const checkUser=async(req,res)=>{
    const user = req.user;
  
    console.log("data", user.data);
    const findUser = await User.findOne({ email: user.data });
  
    if (!findUser) {
      return res.json({ message: "authentication failed", success: false });
    }
    
    res.json({ message: "authenticateUser", success: true });

}