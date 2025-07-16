const Donation = require('../models/Donation');

const createDonation = async (donationData) => {
    const newDonation = new Donation(donationData);
    return await newDonation.save();
};

const getTotalDonations = async () => {
    const total = await Donation.aggregate([
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$amount' },
            },
        },
    ]);
    return total[0]?.totalAmount || 0;
};

const getLastDonations = async (limit = 5) => {
    return await Donation.find().sort({ date: -1 }).limit(limit);
};

const getDonationsByCause = async () => {
    return await Donation.aggregate([
        {
            $group: {
                _id: '$cause',
                totalAmount: { $sum: '$amount' },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                cause: '$_id',
                totalAmount: 1,
                count: 1,
            },
        },
        {
            $sort: { totalAmount: -1 },
        },
    ]);
};

const getAllDonations = async () => {
    return await Donation.find().sort({ date: -1 });
};

module.exports = {
    createDonation,
    getTotalDonations,
    getLastDonations,
    getDonationsByCause,
    getAllDonations,
};