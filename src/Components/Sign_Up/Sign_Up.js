import React, { useState } from 'react';
import './Sign_Up.css';

function Sign_Up() {
  const initialFormState = { name: '', phone: '', email: '', password: '' };
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!form.phone.match(/^\d{10}$/)) {
      errs.phone = 'Phone number must be exactly 10 digits';
    }
    if (!form.email.includes('@')) {
      errs.email = 'Invalid email';
    }
    if (!form.password || form.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert('Form submitted successfully!');
      // perform API call
    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
    setErrors({});
  };

  return (
    <div className="container">
      <div className="signup">
        <h1>Sign Up</h1>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          Already a member? <a href="/login" style={{ color: '#2190FF' }}>Login</a>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" placeholder="Enter Your Name" required value={form.name} onChange={handleChange} className="form-control" />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" placeholder="Enter Your Phone Number" required pattern="\d{10}" value={form.phone} onChange={handleChange} 
                onInvalid={(e) => e.target.setCustomValidity("Phone number must be exactly 10 digits")}
                onInput={(e) => e.target.setCustomValidity("")} className="form-control" />
            {errors.phone && <small className="error">{errors.phone}</small>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter Your Email" required value={form.email} onChange={handleChange} className="form-control" />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter Your Password" minLength={6} required value={form.password} onChange={handleChange} onInvalid={(e) => {
                    if (e.target.validity.valueMissing) {
                    e.target.setCustomValidity("Please enter your password.");
                    } else if (e.target.validity.tooShort) {
                    e.target.setCustomValidity("Password must be at least 6 characters.");
                    } else {
                    e.target.setCustomValidity("");
                    }
                }}
                onInput={(e) => e.target.setCustomValidity("")}
                className="form-control"/>
            {errors.password && <small className="error">{errors.password}</small>}
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="reset" onClick={handleReset} className="btn btn-danger">Reset</button>
          </div>
        </form>
        <div className="blob-cont">
            <div className="blue blob"></div>
          </div>
          <div className="blob-cont">
            <div className="blue1 blob"></div>
          </div>
      </div>
    </div>
  );
}

export default Sign_Up;
