// src/Components/ProfileCard/ProfileCard.js
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProfileCard.css'; // You can also use navbar.css if styles are shared

const ProfileCard = ({ username, showDropdown, setShowDropdown }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowDropdown]);

  return (
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
  );
};

export default ProfileCard;
