import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = () => {
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const handleAppointmentBooked = (event) => {
      const { doctorName, speciality, appointment } = event.detail;
      setAppointment({ doctorName, speciality, ...appointment });
    };

    const handleAppointmentCancelled = () => {
      setAppointment(null);
    };

    window.addEventListener('appointmentBooked', handleAppointmentBooked);
    window.addEventListener('appointmentCancelled', handleAppointmentCancelled);

    return () => {
      window.removeEventListener('appointmentBooked', handleAppointmentBooked);
      window.removeEventListener('appointmentCancelled', handleAppointmentCancelled);
    };
  }, []);

  if (!appointment) return null;

  return (
    <div className="notification-card">
      <h4>Appointment Details</h4>
      <p><strong>Doctor:</strong> Dr. {appointment.doctorName}</p>
      <p><strong>Speciality:</strong> {appointment.speciality}</p>
      <p><strong>Name:</strong> {appointment.name}</p>
      <p><strong>Phone Number:</strong> {appointment.phoneNumber}</p>
      <p><strong>Date of Appointment:</strong> {appointment.date}</p>
      <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
    </div>
  );
};

export default Notification;
