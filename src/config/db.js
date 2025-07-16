const mongoose = require('mongoose');

const connectDB = async () => {
    // --- Use environment variable for MongoDB URI ---
    const mongoURI = process.env.MONGO_URI; 

    // Basic check to ensure the URI is loaded
    if (!mongoURI) {
        console.error('FATAL ERROR: MONGO_URI is not defined in .env file!');
        process.exit(1); // Exit if critical env variable is missing
    }

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // These options are deprecated in newer Mongoose versions (6.0+),
            // so if you're on a recent version, you can safely remove them.
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;