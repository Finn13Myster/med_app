const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  doctorName: String,
  doctorSpeciality: String,
  type: { type: String, enum: ['instant', 'booking'] },
  date: Date,
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
