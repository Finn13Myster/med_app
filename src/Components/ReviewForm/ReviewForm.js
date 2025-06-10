import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ReviewForm.css';

const ReviewForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [submitted, setSubmitted] = useState({});
  const [feedbackData, setFeedbackData] = useState({});
  const [submittedMessages, setSubmittedMessages] = useState({});

  useEffect(() => {
    const doctorData = JSON.parse(localStorage.getItem('doctorData'));
    if (doctorData) {
      const savedAppointment = JSON.parse(localStorage.getItem(doctorData.name));
      if (savedAppointment) {
        setAppointments([{ ...doctorData, ...savedAppointment }]);
      }
    }
  }, []);

  const handleChange = (e, doctorName) => {
    setFeedbackData({
      ...feedbackData,
      [doctorName]: {
        ...feedbackData[doctorName],
        [e.target.name]: e.target.value
      }
    });
  };

  const handleSubmit = (e, doctorName, close) => {
    e.preventDefault();
    setSubmitted({ ...submitted, [doctorName]: true });
    setSubmittedMessages({
      ...submittedMessages,
      [doctorName]: {
        rating: feedbackData[doctorName]?.rating || '',
        review: feedbackData[doctorName]?.review || ''
      }
    });
    close();
  };

  const handleRatingClick = (doctorName, rating) => {
  setFeedbackData((prev) => ({
    ...prev,
    [doctorName]: {
      ...prev[doctorName],
      rating,
    }
  }));
};


  return (
    <div className="review-container">
      <br /><br />
      <h1>Reviews</h1>

      {appointments.length > 0 ? (
        <table className="review-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor Name</th>
              <th>Speciality</th>
              <th>Provide Feedback</th>
              <th>Review Given</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{appt.name}</td>
                <td>{appt.speciality}</td>
                <td>
                <Popup
                    trigger={
                        <button
                        className="feedback-button"
                        disabled={submitted[appt.name]}
                        >
                        {submitted[appt.name] ? 'Submitted' : 'Click Here'}
                        </button>
                    }
                    modal
                    nested
                    >
                    {(close) => (
                        <div className="feedback-modal">
                        <h3>Feedback for {appt.name}</h3>
                        <form onSubmit={(e) => handleSubmit(e, appt.name, close)} className="feedback-form">
                            <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            onChange={(e) => handleChange(e, appt.name)}
                            />
                            <textarea
                            name="review"
                            placeholder="Your Review"
                            required
                            onChange={(e) => handleChange(e, appt.name)}
                            />
                            <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                key={star}
                                className={`star ${feedbackData[appt.name]?.rating >= star ? 'filled' : ''}`}
                                onClick={() => handleRatingClick(appt.name, star)}
                                >
                                ★
                                </span>
                            ))}
                            </div>
                            <div style={{ marginTop: '10px' }}>
                            <button type="submit" className='btn-success'>Submit</button>
                            <button type="button" className="btn-cancel" onClick={close}>Cancel</button>
                            </div>
                        </form>
                        </div>
                    )}
                </Popup>

                </td>
                <td>
                  {submittedMessages[appt.name] ? (
                    <div className="submitted-review-box">
                    <strong>Rating:</strong>{' '}
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${submittedMessages[appt.name].rating >= star ? 'filled' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                    <br />
                    <strong>Review:</strong> {submittedMessages[appt.name].review}
                  </div>                  
                  ) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center' }}>No appointments found.</p>
      )}
    </div>
  );
};

export default ReviewForm;
