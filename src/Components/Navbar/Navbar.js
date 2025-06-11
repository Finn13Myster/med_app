// src/Components/Navbar/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "./Logo.png";
import ProfileCard from "../ProfileCard/ProfileCard"; // Import modular dropdown

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
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
            <li className="link"><Link to="/signup"><button className="btn1">Sign Up <i class="fa fa-user-plus" aria-hidden="true"></i></button></Link></li>
            <li className="link"><Link to="/login"><button className="btn1">Login <i class="fa fa-sign-in" aria-hidden="true"></i></button></Link></li>
          </>
        ) : (
          <>
            <ProfileCard username={username} showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
            <li className="link">
              <button className="btn1" onClick={handleLogout}>Logout <i class="fa fa-sign-out" aria-hidden="true"></i></button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
