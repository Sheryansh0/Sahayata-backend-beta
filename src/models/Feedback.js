const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    feedback: {
        type: String,
        required: [true, 'Feedback is required'],
    },
    stars: {
        type: Number,
        required: [true, 'Star rating is required'],
        min: [1, 'Minimum star rating is 1'],
        max: [5, 'Maximum star rating is 5'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Feedback', feedbackSchema);