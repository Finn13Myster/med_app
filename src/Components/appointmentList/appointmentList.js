// src/Components/Appointments/Appointment.js
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import './appointmentList.css';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const email = sessionStorage.getItem("email");
    if (!email) return;

    try {
      const res = await fetch(`${API_URL}/api/appointments/user`, {
        headers: { email },
      });
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const res = await fetch(`${API_URL}/api/appointments/cancel/${appointmentId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setAppointments((prev) =>
          prev.filter((appt) => appt.id !== appointmentId)
        );
      }
    } catch (err) {
      console.error('Cancellation error:', err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="appointment-container">
      <h2>Your Appointments</h2>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Doctor Name</th>
            <th>Specialty</th>
            <th>Type</th>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appt, index) => (
              <tr key={appt._id}>
                <td>{index + 1}</td>
                <td>{appt.doctorName || '-'}</td>
                <td>{appt.doctorSpeciality || '-'}</td>
                <td>{appt.type || '-'}</td>
                <td>{appt.type === 'booking' && appt.date ? new Date(appt.date).toLocaleDateString() : '-'}</td>
                <td>{appt.type === 'booking' && appt.timeSlot ? appt.timeSlot : '-'}</td>
                <td>
                  <button
                    className="cancel-btn"
                    onClick={() => cancelAppointment(appt.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
