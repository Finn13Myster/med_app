const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Book appointment
router.post('/book', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

// Cancel appointment
router.delete('/cancel/:id', async (req, res) => {
    try {
      const result = await Appointment.findOneAndDelete({ id: req.params.id }); // match using custom "id" field
      if (!result) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      res.status(200).json({ message: 'Appointment cancelled successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to cancel appointment' });
    }
  });
  

// GET: Get Appointments by doctor
router.get('/by-doctor', async (req, res) => {
  try {
    const { doctorName, doctorSpeciality } = req.query;
    const appts = await Appointment.find({ doctorName, doctorSpeciality });
    res.json(appts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

module.exports = router;
