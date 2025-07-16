const feedbackService = require('../services/feedbackService');

const submitFeedback = async (req, res, next) => {
    const { name, feedback, stars } = req.body;

    // Basic validation (can be enhanced with Joi/express-validator middleware)
    if (!name || !feedback || stars === undefined) {
        return res.status(400).json({ message: 'All fields (name, feedback, stars) are required.' });
    }

    try {
        const savedFeedback = await feedbackService.createFeedback({ name, feedback, stars });
        res.status(201).json({
            message: 'Feedback submitted successfully!',
            feedback: savedFeedback,
        });
    } catch (error) {
        // Pass error to centralized error handler
        next(error);
    }
};

module.exports = {
    submitFeedback,
};