import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function Landing_Page() {
  return (
    <section className="hero-section">
      <div>
        <div data-aos="fade-up" className="flex-hero">
          <h1>
            Your Health<br />
            <span className="text-gradient">Our Responsibility</span>
          </h1>
          <div className="blob-cont">
            <div className="blue blob"></div>
          </div>
          <div className="blob-cont">
            <div className="blue1 blob"></div>
          </div>
          <h4>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur 
          adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex 
          sapien vitae pellentesque.
          </h4>
          <a href="#services">
            <button className="button">Get Started</button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Landing_Page;
