import React from "react";
import "./navbar.css";
import logo from "./Logo.png"; // Adjust path as needed

function Navbar() {
  const handleClick = () => {
    // Toggle nav logic (can be added as needed)
  };

  return (
    <nav>
      <div className="title">
        <a href="/" className="title_logo">
          StayHealthy
          <img src={logo} alt="Logo" className="logo_img" />
          <span></span>
        </a>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className="fa fa-times fa fa-bars"></i>
      </div>
      <ul className="nav__links active">
        <li className="link">
          <a href="../Landing_Page/LandingPage.html">Home</a>
        </li>
        <li className="link">
          <a href="#">Appointments</a>
        </li>
        <li className="link">
          <a href="../Sign_Up/Sign_Up.html">
            <button className="btn1">Sign Up</button>
          </a>
        </li>
        <li className="link">
          <a href="../Login/Login.html">
            <button className="btn1">Login</button>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
