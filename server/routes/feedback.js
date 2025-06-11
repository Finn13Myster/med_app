const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST: Submit feedback
router.post('/', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    const saved = await newFeedback.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// GET: Retrieve feedback by doctor
router.get('/by-doctor', async (req, res) => {
  try {
    const { doctorName, doctorSpeciality } = req.query;
    const feedbacks = await Feedback.find({ doctorName, doctorSpeciality });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

module.exports = router;
