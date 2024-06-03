import dotenv from "dotenv";
import Razorpay from "razorpay";

dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RP_KEY_ID || "",
  key_secret: process.env.RP_SECRET_KEY || "",
});

export default razorpayInstance;