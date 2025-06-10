import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";            // ← import your CSS here
import { API_URL } from "../../config";

const Login = () => {
  // State variables for email and password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  // If already logged in, redirect home
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  // Handle form submit
  const login = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("email", email);
      navigate("/");
      window.location.reload();
    } else {
      if (json.errors) {
        json.errors.forEach((err) => alert(err.msg));
      } else {
        alert(json.error);
      }
    }
  };

  return (
    <div className="container">
      {/* this “login” class gives your green card, padding, shadow, etc */}
      <div className="login">
        <h2>Login</h2>
        <div className="login-text">
          Are you a new member?&nbsp;
          <Link to="/signup" style={{ color: "#2190FF" }}>
            Sign Up Here
          </Link>
        </div>
        <br />
        <div className="login-form">
          <form onSubmit={login}>
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
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Login
              </button>
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
    </div>
  );
};

export default Login;
