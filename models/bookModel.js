import mongoose  from "mongoose"

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:30,
        unique:true,
    },
    category:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true,
        maxLength:30,
    },
    language:{
        type:String,
        maxLength:20,
    },
    description:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,

    },
    
},
{timestamps:true}
)

const Book=mongoose.model("Book",bookSchema)

export default Book

