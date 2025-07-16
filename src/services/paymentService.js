const Razorpay = require('razorpay');

// Initialize Razorpay with your keys
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createRazorpayOrder = async (amountInPaise, currency = 'INR', receiptId = 'receipt_order_1') => {
    const options = {
        amount: amountInPaise, // amount in the smallest currency unit (e.g., 50000 paise = INR 500.00)
        currency: currency,
        receipt: receiptId,
        // You can add more options here like notes, payment_capture etc.
    };

    try {
        const order = await instance.orders.create(options);
        return order;
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        throw new Error('Failed to create Razorpay order');
    }
};

const verifyPaymentSignature = (orderId, paymentId, signature) => {
    // This is the crucial step for security.
    // Razorpay provides a utility to verify the signature.
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(orderId + "|" + paymentId);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === signature) {
        return true; // Signature is valid
    } else {
        return false; // Signature is invalid
    }
};

module.exports = {
    createRazorpayOrder,
    verifyPaymentSignature,
};