require('dotenv').config(); // Load environment variables at the very top

const app = require('./src/app'); // Import the configured Express app
const connectDB = require('./src/config/db'); // Import DB connection function

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});