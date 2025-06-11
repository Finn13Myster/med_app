// src/components/ReviewForm/ReviewForm.js
import React, { useEffect, useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [submitted, setSubmitted] = useState({});

  useEffect(() => {
    fetch('/api/appointments/user')
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error("Failed to fetch appointments:", err));
  }, []);

  const handleSubmit = async (e, apptId, reviewData) => {
    e.preventDefault();

    const response = await fetch(`/api/feedback/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...reviewData, appointmentId: apptId }),
    });

    if (response.ok) {
      setSubmitted({ ...submitted, [apptId]: true });
    }
  };

  return (
    <div className="review-container">
      <h2>Doctor Reviews</h2>
      <table className="review-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Doctor</th>
            <th>Speciality</th>
            <th>Feedback</th>
            <th>Submitted Review</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, index) => (
            <tr key={appt._id}>
              <td>{index + 1}</td>
              <td>{appt.doctorName}</td>
              <td>{appt.speciality}</td>
              <td>
                {!submitted[appt._id] ? (
                  <form onSubmit={(e) => handleSubmit(e, appt._id, {
                    name: appt.name,
                    review: e.target.review.value,
                    rating: e.target.rating.value
                  })}>
                    <input type="text" name="name" required placeholder="Your Name" />
                    <textarea name="review" required placeholder="Your Review" />
                    <select name="rating" required>
                      <option value="">Rate</option>
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <button type="submit">Submit</button>
                  </form>
                ) : (
                  <span>Submitted</span>
                )}
              </td>
              <td>{submitted[appt._id] && "✔️"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewForm;
