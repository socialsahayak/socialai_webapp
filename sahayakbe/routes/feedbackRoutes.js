const express = require('express');
const Feedback = require('../models/feedbackSchema'); // Importing feedbackSchema model
const router = express.Router();

// Route to handle feedback submission
router.post('/', async (req, res) => {
    try {
      const { name, email, message } = req.body;

    // Create a new feedback document
    const feedback = new Feedback({
      name,
      email,
      message,
    });

    // Save feedback to database
    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting feedback' });
  }
});

module.exports = router;
