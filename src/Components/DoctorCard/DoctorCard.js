// src/Components/DoctorCard/DoctorCard.js
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';
import { API_URL } from '../../config'; // Make sure you have this configured

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => setShowModal(true);

  const handleCancel = async (appointmentId) => {
    try {
      const response = await fetch(`${API_URL}/api/appointments/cancel/${appointmentId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedAppointments = appointments.filter(a => a.id !== appointmentId);
        setAppointments(updatedAppointments);
        const event = new Event('appointmentCancelled');
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.error("Cancellation error:", error);
    }
  };

  const handleFormSubmit = async (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
      doctorName: name,
      doctorSpeciality: speciality,
    };

    try {
      const response = await fetch(`${API_URL}/api/appointments/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAppointment),
      });

      if (response.ok) {
        setAppointments([newAppointment]);
        const event = new CustomEvent('appointmentBooked', {
          detail: { doctorName: name, speciality, appointment: newAppointment }
        });
        window.dispatchEvent(event);
        setShowModal(false);
      }
    } catch (err) {
      console.error('Error saving appointment:', err);
    }
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          {profilePic ? (
            <img src={profilePic} alt="Doctor" className="doctor-profile-img" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          )}
        </div>
        <div className="doctor-card-details">
          <h3 className="doctor-card-detail-name">{name || "Dr. Unknown"}</h3>
          <p className="doctor-card-detail-speciality">{speciality || "General Physician"}</p>
          <p className="doctor-card-detail-experience">{experience || 0} years experience</p>
          <p className="doctor-card-detail-consultationfees">Ratings: {ratings || 0}</p>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <Popup
          trigger={
            <button
              className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment-btn' : 'book-appointment-btn'}`}
              onClick={handleBooking}
            >
              <div>{appointments.length > 0 ? 'Cancel Appointment' : 'Book Appointment'}</div>
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              <div className="doctor-card-details">
                <h3>{name}</h3>
                <p><strong>Speciality:</strong> {speciality}</p>
                <p><strong>Experience:</strong> {experience} years</p>
                <p><strong>Ratings:</strong> {ratings}</p>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone: {appointment.phoneNumber}</p>
                      <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
              )}
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;
