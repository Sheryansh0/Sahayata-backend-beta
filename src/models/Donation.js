// src/models/Donation.js
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    amount: { // This is the amount in your currency (e.g., INR 500.00)
        type: Number,
        required: [true, 'Donation amount is required'],
        min: [0, 'Donation amount must be positive'],
    },
    cause: {
        type: String,
        required: [true, 'Cause is required'],
        enum: ['Old Age Home', 'Orphanage', 'Medical Emergency', 'Education', 'Environmental'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    // NEW: Add Razorpay specific fields
    paymentId: {
        type: String,
        unique: true, // paymentId should be unique for each successful transaction
        sparse: true, // allows null values but ensures uniqueness for non-null
    },
    orderId: {
        type: String,
    },
});

module.exports = mongoose.model('Donation', donationSchema);