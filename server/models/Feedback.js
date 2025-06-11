const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: String,
  doctorName: String,
  doctorSpeciality: String,
  review: String,
  rating: Number,
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
