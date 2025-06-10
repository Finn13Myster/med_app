import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "./Logo.png";

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
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/appointments">Appointments</Link>
        </li>
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
      </ul>
    </nav>
  );
}

export default Navbar;
