import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "./Logo.png";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    setIsLoggedIn(!!token);

    if (token) {
      const email = sessionStorage.getItem("email") || "";
      const nameFromEmail = email.split("@")[0];
      setUsername(nameFromEmail);
    } else {
      setUsername("");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        </Link>
      </div>
      <ul className="nav__links active">
        <li className="link"><Link to="/">Home</Link></li>
        <li className="link"><Link to="/appointments">Appointments</Link></li>
        <li className="link"><Link to="/BookingConsultation">Book Consultation</Link></li>
        <li className="link"><Link to="/instant-consultation">Instant Consultation</Link></li>
        <li className="link"><Link to="/ReviewForm">Reviews</Link></li>

        {!isLoggedIn ? (
          <>
            <li className="link"><Link to="/signup"><button className="btn1">Sign Up</button></Link></li>
            <li className="link"><Link to="/login"><button className="btn1">Login</button></Link></li>
          </>
        ) : (
          <>
            <li className="link profile-dropdown-container" ref={dropdownRef}>
              <span
                className="username-display"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                Welcome, {username}
              </span>
              {showDropdown && (
                <div className="profile-dropdown-card">
                    <h3>Your Profile</h3>
                  <Link to="/profile"><div className="dropdown-item">Your Profile</div></Link>
                  <Link to="/reports"><div className="dropdown-item">Your Reports</div></Link>
                </div>
              )}
            </li>
            <li className="link">
              <button className="btn1" onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
