import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/LandingPage'
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";
import ProfileCard from './Components/ProfileCard/ProfileCard';
import BookingConsultation from './Components/BookingConsultation'; 
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import Notification from './Components/Notification/Notification'; 
import ReviewForm from './Components/ReviewForm/ReviewForm';
import ProfileForm from './Components/ProfileForm/ProfileForm';
import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar />
            <Notification />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<Sign_Up />} />
                <Route path="/login" element={<Login />} />
                <Route path="/ReviewForm" element={<ReviewForm />} />
                <Route path="/profile-card" element={<ProfileCard />} />
                <Route path="/profile" element={<ProfileForm />} />
                <Route path="/BookingConsultation" element={<BookingConsultation />}/>
                <Route path="/instant-consultation" element={<InstantConsultation />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
