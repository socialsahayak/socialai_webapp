const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoute');
const feedbackRoutes = require('./routes/feedbackRoutes');
const axios = require('axios'); // Import Axios for HTTP requests
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

// Route to interact with Flask API
app.post('/api/question', async (req, res) => {
  const { question } = req.body;
  console.log(question);
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    // Flask API URL from ngrok
    const flaskApiUrl = process.env.FLASK_API_URL;

    // Make a POST request to the Flask API
    const response = await axios.post('https://5ff9-34-141-158-98.ngrok-free.app/process_question', { question });

    // Send Flask API response back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error communicating with Flask API:', error.message);
    res.status(500).json({ error: 'Failed to communicate with Flask API' });
  }
});


// User-related routes
app.use('/api/user', userRoutes);

// Feedback-related routes
app.use('/api/feedback', feedbackRoutes);

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is listening on PORT : ${PORT}`);
});
