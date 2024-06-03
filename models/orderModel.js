import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
        user: {
                type: mongoose.Types.ObjectId,
                ref: "User",
        },
        book: {
                type: mongoose.Types.ObjectId,
                ref: "Book",
        },
        status: {
                type: String,
                default: "Order placed",
                enum: ["Order Placed", "Out for delivery,Delivered,Cancelled"]
        }

},
        { timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)

export default Order

