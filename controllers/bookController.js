import { cloudinaryInstance } from "../config/cloudinary.js";
// import  Admin from '../models/adminModel.js'
import Book from '../models/bookModel.js'
// import Category from '../models/categoryModel.js'

//get books
export const getBooks=async(req,res)=>{
    const books=await Book.find();
    res.send(books)
}

//get book by id
export const getBookbyId=async(req,res)=>{
    try {
const {id}=req.params;
const book =await Book.findById(id)
return res.json({status:"Success",data:book,})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"an error occured"})
    }
}

//add books

export const addBooks=async(req,res)=>{
    try {
        
        if(!req.file){
            return res.status(400).json({success:false,message:"No file uploaded"})
        }
        cloudinaryInstance.uploader.upload(req.file.path,async(err,result)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    message:"Error",
                })
            }

            const imageUrl=result.url;
            const {title,description,price,author,language,category}=req.body;

            const addBook=new Book({
                title,
                description,
                price,
                author,
                language,
                category,
                image:imageUrl,
            })

            const newBookAdded=await addBook.save()
            if(!newBookAdded){
                res.send("Book is not added")
            }else{
                console.log(newBookAdded)
            return res.send("New Book Added")
            }
        })
    } catch (error) {
        console.log("Something went to wrong",error);
        res.send("Failed to Add Book")
    }
}

//update books

export const updateBook=async(req,res)=>{
    const id=req.params.id;
    console.log(id)
    
    const {title,description,price,publisher,language}=req.body;

    const updatedBook=await Book.findOneAndUpdate({_id:id},{title,description,price,publisher,language},{new:true})
    if(!updatedBook){
        return res.send("Book is not updated")
    }
    console.log(updatedBook)
    return res.send(updatedBook)

}

//delete book

export const deleteBook=async(req,res)=>{
    const id=req.params.id;

    const deletedBook=await Book.deleteOne({_id:id})
    if(!deletedBook){
        return res.send("Book not deleted")
    }
    res.send("Book deleted")
}