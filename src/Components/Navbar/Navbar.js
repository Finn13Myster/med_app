import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "./Logo.png";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    setIsLoggedIn(!!token);

    if (token) {
      const email = sessionStorage.getItem("email") || "";
      // Extract username from email before '@'
      const nameFromEmail = email.split("@")[0];
      setUsername(nameFromEmail);
    } else {
      setUsername("");
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  return (
    <nav>
      <div className="title">
        <Link to="/" className="title_logo">
          StayHealthy
          <img src={logo} alt="Logo" className="logo_img" />
          <span></span>
        </Link>
      </div>
      <div className="nav__icon" onClick={() => {}}>
        <i className="fa fa-times fa fa-bars"></i>
      </div>
      <ul className="nav__links active">
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/appointments">Appointments</Link>
        </li>

        {!isLoggedIn ? (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="link username-display" style={{ paddingRight: "10px", fontWeight: "600" }}>
              Hello, {username}
            </li>
            <li className="link">
              <button className="btn1" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
