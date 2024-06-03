import User from "../models/userModel.js"


//put book to cart
//add to cart
export const addToCart=async(req,res)=>{
try {
    const {bookid,id}=req.headers;
    const userData=await User.find(id)
    const bookInCart=userData.cart.includes(bookid)
    if(bookInCart){
        return res.json({
            status:"Success",
            message:"Book is already in cart"
        })
    }
    await User.findByIdAndUpdate(id,{
        $push:{cart:bookid},
    })

    return res.json({
        status:"Success",
        messgae:"Book is added to cart"
    })
} catch (error) {
    console.log(error)
    return res.status(500).json({message:"An error occured"})
}
}

//remove from cart

export const removeFromCart=async(req,res)=>{
    try {
        const {bookid}=req.params;
        const {id}=req.headers;
        await User.findByIdAndUpdate(id,{
            $pull:{cart:bookid},
        })
        return res.json({
            status:"Success",
            message:"Bok removed from cart",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"An error occured"})
    }
}

//get cart of a particular user

export const getUserCart=async(req,res)=>{
    try {
        const {id}=req.headers;
        const userData= await User.findById(id).populate("cart")
        const cart=userData.cart.reverse()
        return res.json({status:"Success",data:cart})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"An error occured"})
    }
}