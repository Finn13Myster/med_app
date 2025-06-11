const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/submit', async (req, res) => {
  const { appointmentId, name, review, rating } = req.body;

  try {
    const newFeedback = new Feedback({
      appointmentId,
      name,
      review,
      rating,
    });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error(err);
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
