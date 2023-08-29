// Import required modules and models
const Razorpay = require('razorpay');
const router = require("express").Router();
const { AmountDeposited } = require('../models/amountDeposited');
const { Client } = require('../models/client');
const auth = require("../middleware/auth")
const admin = require("../middleware/auth")
const validateObjectId = require("../middleware/validateObjectId")
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

// Create a new instance of the Razorpay client




router.post("/orders", async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id:process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});
		const { clientId, amount } = req.body;

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, async (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

router.post("/verify", async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature} =req.body.response;
		const clientId=req.body.clientId;
		const amount= req.body.amount;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");
        
		if (razorpay_signature === expectedSign) {
			  const transaction = new AmountDeposited({
				client: clientId,
				amountDeposited: amount,
				paymentTime: new Date(),
				transactionId: razorpay_payment_id,
				status: "success"
			  });
		      
			  const client = await Client.findById(clientId);

			  await transaction.save();
		
			  // Push the transaction into the client's amountDeposited array
			  client.amountDeposited.push(transaction);
			  client.currentBalance = parseInt(client.currentBalance,10) + parseInt(amount,10);
			  await client.save();

			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

module.exports = router;
