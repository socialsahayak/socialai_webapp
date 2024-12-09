const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoute');
const feedbackRoutes = require('./routes/feedbackRoutes');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Define CORS options
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000', // Allow requests only from the frontend URL
  credentials: true, // Allow cookies and credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

// Enable CORS middleware
app.use(cors(corsOptions));

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies in requests

// Log requests for debugging
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    console.log('Cookies:', req.cookies); // Log cookies for debugging
    next();
  });
}

// Routes
app.use('/api/user', userRoutes); // User-related routes
app.use('/api/feedback', feedbackRoutes); // Feedback-related routes

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is listening on PORT : ${PORT}`);
});
