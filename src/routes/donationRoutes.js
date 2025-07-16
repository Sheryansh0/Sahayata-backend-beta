const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

// POST Route: Submit a Donation
router.post('/donate', donationController.submitDonation);

// GET Route: Get Total Donations
router.get('/donations/total', donationController.getTotalDonations);

// GET Route: Get Last 5 Donations
router.get('/donations/last-5', donationController.getLastDonations);

// GET Route: Get Donations by Cause
router.get('/donations/by-cause', donationController.getDonationsByCause);

// Optional: GET Route to Fetch All Donations (for admin purposes)
router.get('/donations', donationController.getAllDonations);

module.exports = router;