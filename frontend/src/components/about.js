import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h2 className="main-title">About Me</h2>
      <p className="intro">
        Hi, I'm <strong>Rohitha 👋</strong>. I'm a passionate developer skilled
        in React, Node.js, and the MERN stack. I love building web apps and
        solving real-world problems.
      </p>
      

      {/* Personal + Professional + Interests side by side */}
      <div className="info-sections-grid">
        {/* Personal Info Section */}
        <div className="info-section">
          <h2 className="section-title">Personal Info</h2>
          <div className="info-grid">
            <div className="info-box">
              <h3>Name</h3>
              <p>Rohitha Channamallu</p>
            </div>
            <div className="info-box">
              <h3>Age</h3>
              <p>21</p>
            </div>
            <div className="info-box">
              <h3>Email</h3>
              <p>rohitha@example.com</p>
            </div>
            <div className="info-box">
              <h3>Status</h3>
              <p>Undergraduate</p>
            </div>
          </div>
        </div>

        {/* Professional Info Section */}
        <div className="info-section">
          <h2 className="section-title">Professional Info</h2>
          <div className="info-grid">
            <div className="info-box">
              <h3>Experience</h3>
              <p>Built multiple academic and personal projects in Web Development</p>
            </div>
            <div className="info-box">
              <h3>Current Learning</h3>
              <p>Ethical Hacking (CEH), AWS Cloud Fundamentals</p>
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className="info-section">
          <h2 className="section-title">Interests</h2>
          <div className="info-grid">
            <div className="info-box"><p>Coding & Problem Solving</p></div>
            <div className="info-box"><p>UI/UX Design</p></div>
            <div className="info-box"><p>Exploring AI & Data Science</p></div>
            <div className="info-box"><p>Cybersecurity & Cloud</p></div>
            <div className="info-box"><p>Traveling and Blogging</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
