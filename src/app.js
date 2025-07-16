const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const donationRoutes = require('./routes/donationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const errorHandler = require('./middleware/errorHandler'); // For centralized error handling
const paymentRoutes = require('./routes/paymentRoutes');
const app = express();

// Middleware Setup
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api', donationRoutes); // All donation routes prefixed with /api
app.use('/api', feedbackRoutes); // All feedback routes prefixed with /api
app.use('/api', paymentRoutes);
// Default Route
app.get('/', (req, res) => {
    res.send('Donation API is running.');
});

// Centralized Error Handling Middleware (must be last middleware)
app.use(errorHandler);

module.exports = app;