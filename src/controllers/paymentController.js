const paymentService = require('../services/paymentService');
const donationService = require('../services/donationService'); // To save donation after successful payment

const createOrder = async (req, res, next) => {
    const { amount, cause, name, email } = req.body; // Assuming these come from frontend for a donation

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Amount is required and must be positive.' });
    }
    // You might also validate cause, name, email here or in a middleware

    try {
        // Razorpay amounts are in the smallest unit (e.g., paise for INR)
        const amountInPaise = Math.round(amount * 100);
        const order = await paymentService.createRazorpayOrder(amountInPaise, 'INR', `receipt_donation_${Date.now()}`);

        // You might want to temporarily store order details in your DB
        // or session to link it to the final donation after payment.
        // For simplicity, we'll pass it to the frontend and verify it later.

        res.status(200).json({
            message: 'Order created successfully',
            orderId: order.id,
            currency: order.currency,
            amount: order.amount,
            // Include user details if you want them on the Razorpay checkout
            user: { name, email },
        });
    } catch (error) {
        next(error); // Pass to centralized error handler
    }
};

const verifyPayment = async (req, res, next) => {
    const { orderId, paymentId, signature, donationData } = req.body; // donationData to save the donation

    if (!orderId || !paymentId || !signature || !donationData) {
        return res.status(400).json({ message: 'Missing payment verification details.' });
    }

    try {
        const isSignatureValid = paymentService.verifyPaymentSignature(orderId, paymentId, signature);

        if (isSignatureValid) {
            // Payment is verified successfully!
            // Now, save the donation to your database
            const savedDonation = await donationService.createDonation({
                name: donationData.name,
                email: donationData.email,
                amount: donationData.amount, // This should be the original amount from your frontend/order creation
                cause: donationData.cause,
                paymentId: paymentId, // Store Razorpay payment ID for reference
                orderId: orderId, // Store Razorpay order ID
            });

            res.status(200).json({
                message: 'Payment verified and donation recorded successfully!',
                donation: savedDonation,
                paymentStatus: 'success',
            });
        } else {
            // Signature mismatch, payment might be fraudulent or tampered with
            res.status(400).json({
                message: 'Payment verification failed: Invalid signature.',
                paymentStatus: 'failed',
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder,
    verifyPayment,
};