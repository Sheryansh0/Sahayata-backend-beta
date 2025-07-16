const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ message: messages.join('. ') });
    }

    // Handle CastError (e.g., invalid MongoDB ID)
    if (err.name === 'CastError') {
        return res.status(400).json({ message: `Invalid ${err.path}: ${err.value}` });
    }

    // Generic server error
    res.status(err.statusCode || 500).json({
        message: err.message || 'Server Error: An unexpected error occurred.',
    });
};

module.exports = errorHandler;