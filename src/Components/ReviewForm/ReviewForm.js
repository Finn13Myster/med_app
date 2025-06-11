import React, { useEffect, useState } from 'react';
import './ReviewForm.css';
import Popup from 'reactjs-popup';
import { API_URL } from '../../config';

const StarRating = ({ rating, onChange }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={n <= rating ? "star filled" : "star"}
          onClick={() => onChange(n)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ReviewForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [submitted, setSubmitted] = useState({});
  const [openModalId, setOpenModalId] = useState(null);
  const [reviewData, setReviewData] = useState({});

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (!email) return;

    fetch(`${API_URL}/api/appointments/user`, {
      headers: { email },
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
      })
      .catch((err) => console.error("Failed to fetch appointments:", err));
  }, []);

  const handleSubmit = async (apptId) => {
    const response = await fetch(`${API_URL}/api/feedback/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...reviewData[apptId], appointmentId: apptId }),
    });

    if (response.ok) {
      setSubmitted((prev) => ({ ...prev, [apptId]: true }));
      setOpenModalId(null);
    }
  };

  const handleChange = (apptId, field, value) => {
    setReviewData((prev) => ({
      ...prev,
      [apptId]: {
        ...prev[apptId],
        [field]: value,
      },
    }));
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
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appt, index) =>
              appt.doctorName ? (
                <tr key={appt._id}>
                  <td>{index + 1}</td>
                  <td>{appt.doctorName}</td>
                  <td>{appt.doctorSpeciality}</td>
                  <td>
                    <Popup
                      open={openModalId === appt._id}
                      trigger={
                        <button
                          className="feedback-btn"
                          disabled={submitted[appt._id]}
                          onClick={() => setOpenModalId(appt._id)}
                        >
                          {submitted[appt._id] ? 'Submitted' : 'Click here'}
                        </button>
                      }
                      modal
                      onClose={() => setOpenModalId(null)}
                    >
                      {(close) => (
                        <div className="modal">
                          <h3>Submit Your Review</h3>
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={reviewData[appt._id]?.name || ''}
                            onChange={(e) => handleChange(appt._id, 'name', e.target.value)}
                          />
                          <textarea
                            placeholder="Your Review"
                            value={reviewData[appt._id]?.review || ''}
                            onChange={(e) => handleChange(appt._id, 'review', e.target.value)}
                          />
                          <StarRating
                            rating={reviewData[appt._id]?.rating || 0}
                            onChange={(val) => handleChange(appt._id, 'rating', val)}
                          />
                          <div className="modal-actions">
                            <button className="btn-success" onClick={() => handleSubmit(appt._id)}>Submit</button>
                            <button className="btn-cancel" onClick={close}>Cancel</button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </td>
                  <td>
                    {submitted[appt._id] && (
                      <div className="submitted-review-box">
                        <p><strong>Name:</strong> {reviewData[appt._id]?.name}</p>
                        <p><strong>Review:</strong> {reviewData[appt._id]?.review}</p>
                        <p><strong>Rating:</strong> {'★'.repeat(reviewData[appt._id]?.rating || 0)}</p>
                      </div>
                    )}
                  </td>
                </tr>
              ) : null
            )
          ) : (
            <tr>
              <td colSpan="5">No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewForm;
