const donationService = require('../services/donationService');

const submitDonation = async (req, res, next) => {
    const { name, email, amount, cause } = req.body;

    // Basic validation (can be enhanced with Joi/express-validator middleware)
    if (!name || !email || !amount || !cause) {
        return res.status(400).json({ message: 'All fields (name, email, amount, cause) are required.' });
    }

    try {
        const savedDonation = await donationService.createDonation({ name, email, amount, cause });
        res.status(201).json({
            message: 'Donation submitted successfully!',
            donation: savedDonation,
        });
    } catch (error) {
        // Pass error to centralized error handler
        next(error);
    }
};

const getTotalDonations = async (req, res, next) => {
    try {
        const totalAmount = await donationService.getTotalDonations();
        res.status(200).json({
            totalDonated: totalAmount,
        });
    } catch (error) {
        next(error);
    }
};

const getLastDonations = async (req, res, next) => {
    try {
        const lastDonations = await donationService.getLastDonations();
        res.status(200).json({
            lastDonations,
        });
    } catch (error) {
        next(error);
    }
};

const getDonationsByCause = async (req, res, next) => {
    try {
        const donationsByCause = await donationService.getDonationsByCause();
        res.status(200).json({
            donationsByCause,
        });
    } catch (error) {
        next(error);
    }
};

const getAllDonations = async (req, res, next) => {
    try {
        const donations = await donationService.getAllDonations();
        res.status(200).json({ donations });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    submitDonation,
    getTotalDonations,
    getLastDonations,
    getDonationsByCause,
    getAllDonations,
};