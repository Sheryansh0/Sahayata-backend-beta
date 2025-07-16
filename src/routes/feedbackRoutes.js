const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// POST Route: Submit Feedback
router.post('/feedback', feedbackController.submitFeedback);

module.exports = router;