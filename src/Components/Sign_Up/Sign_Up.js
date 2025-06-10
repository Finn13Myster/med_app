import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Clear previous error
        setShowerr('');

        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json(); // Parse the response JSON

        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);

            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page to update navbar and other UI
        } else {
            if (json.errors) {
                // Show first error message (or you can customize to show all)
                setShowerr(json.errors[0].msg);
            } else {
                setShowerr(json.error || 'Registration failed. Please try again.');
            }
        }
    };

    // JSX to render the Sign Up form
    return (
    <div className="container">
        <div className="signup">
        <h1>Sign Up</h1>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
            Already have an account? <Link to="/login" style={{ color: "#2190FF" }}>Login here</Link>
            </p>
            <br />
        <div className="signup-form">
            <form method="POST" onSubmit={register}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Enter your name"
                    aria-describedby="helpId"
                />
                </div>

                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    aria-describedby="helpId"
                />
                {showerr && <div className="err" style={{ color: "red" }}>{showerr}</div>}
                </div>

                <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    name="phone"
                    id="phone"
                    className="form-control"
                    placeholder="Enter your phone number"
                    aria-describedby="helpId"
                />
                </div>

                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    aria-describedby="helpId"
                />
                </div>

            {showerr && <div className="error">{showerr}</div>}

            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Sign Up
            </button>
            </form>
            <div className="blob-cont">
                <div className="blue blob"></div>
            </div>
            <div className="blob-cont">
                <div className="blue1 blob"></div>
            </div>
        </div>
        </div>
    </div>
    );

    }

    export default Sign_Up;