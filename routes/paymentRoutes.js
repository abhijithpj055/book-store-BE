import express from "express";
import dotenv from "dotenv";
import crypto from "crypto-js";
import Payment from "../models/paymentModel.js";
import razorpayInstance from "../config/payment.js";

dotenv.config();

const paymentRouter = express.Router();


paymentRouter.post("/order", (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
      console.log(order);
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

paymentRouter.post("/verify", async (req, res) => {
  console.log("very hitted");

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  console.log("req.body", req.body);

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    // secret_key - random bytes
    const expectedSign = crypto
      .createHmac("sha256", process.env.RP_SECRET_KEY || "s")
      .update(sign.toString())
      .digest("hex");

    // console.log(razorpay_signature === expectedSign);

    const isAuthentic = expectedSign === razorpay_signature;
    console.log(isAuthentic);

    if (isAuthentic) {
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      await payment.save();

      res.json({
        message: "Payement Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

export default paymentRouter;