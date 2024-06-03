import mongoose from "mongoose"

const adminSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        enum:["admin"],
    },
    hashPassword:{
        type:String,
        required:true,
        minLength:8,
    },
    books:[
        {
            type:mongoose.Types.ObjectId,
              ref:"Book"
        }
    ],
    
    cart:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Book",
        }
    ],
    orders:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Order"
        }
    ]
},
{timestamps:true}
)

const Admin=mongoose.model("Admin",adminSchema)

export default Admin