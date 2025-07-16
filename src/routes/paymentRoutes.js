const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to create a Razorpay order
router.post('/payment/create-order', paymentController.createOrder);

// Route to verify the payment signature after successful payment
router.post('/payment/verify', paymentController.verifyPayment);

module.exports = router;