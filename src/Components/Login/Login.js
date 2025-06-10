import React, { useState } from 'react';
import './Login.css';

function Login() {
  const initialFormState = { email: '', password: '' };
  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    alert('Logged in successfully!');
    // perform login
  };

    const handleReset = () => {
    setForm(initialFormState);
    setError('');
  };

  return (
    <div className="container">
      <div className="login">
        <h2>Login</h2>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          Are you a new member? <a href="/signup" style={{ color: '#2190FF' }}>Sign Up Here</a>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter Your Email" required value={form.email} onChange={handleChange} className="form-control" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter Your Password" required value={form.password} onChange={handleChange} className="form-control" />
          </div>
          
          <div className="blob-cont">
            <div className="blue blob"></div>
          </div>
          <div className="blob-cont">
            <div className="blue1 blob"></div>
          </div>

          {error && <small className="error">{error}</small>}

          <div className="btn-group">
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="reset" onClick={handleReset} className="btn btn-danger">Reset</button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '15px' }} className="login-text">
            Forgot Password?
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
