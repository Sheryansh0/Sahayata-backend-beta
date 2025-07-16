const Feedback = require('../models/Feedback');

const createFeedback = async (feedbackData) => {
    const newFeedback = new Feedback(feedbackData);
    return await newFeedback.save();
};

// You might add more feedback-related service functions here (e.g., get all feedback, get average rating)

module.exports = {
    createFeedback,
};