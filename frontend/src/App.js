import React from "react";
import "./App.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Components
import About from "./components/about";
import Contact from "./components/contact";
import Skills from "./components/Skills";
import Project from "./components/project";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import profilePic from "./Images/buddigadu20.jpg";

const RESUME_URL = `${process.env.PUBLIC_URL}/resume.pdf`;
const RESUME_FILENAME = "Rohitha_Channamallu_Resume.pdf";
const GITHUB_URL = "https://github.com/rohitha192";
const LINKEDIN_URL =
  "https://www.linkedin.com/in/channamallu-rohitha-aa4503314";

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">Portfolio</h2>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#certifications">Certifications</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-text">
          <h3>Hello, It's Me</h3>
          <h1><span className="highlight">Rohitha Channamallu</span></h1>
          <h2>And I'm a <span className="pink">Frontend Developer</span></h2>
          <p>
            I am a web development enthusiast with skills in building responsive websites,
            frontend development, and a commitment to continuous learning.
          </p>

          <div className="buttons">
            <a href="#contact" className="btn pink-btn">Contact Me</a>
            <a
              href={RESUME_URL}
              download={RESUME_FILENAME}
              className="btn blue-btn"
            >
              Download CV
            </a>
          </div>

          {/* Social Links */}
          <div className="socials">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <FaGithub />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Profile Image */}
        <div className="hero-img">
          <div className="glow-border">
            <img src={profilePic} alt="Rohitha" />
          </div>
        </div>
      </section>

      {/* Sections */}
      <section id="about" className="section">
        <About />
      </section>

      <section id="skills" className="section">
        <Skills />
      </section>

      <section id="projects" className="section">
        <Project />
      </section>

      {/* ✅ Certifications Section */}
      <section id="certifications" className="section">
        <Certifications />
      </section>

      <section id="education" className="section">
        <Education />
      </section>

      <section id="contact" className="section">
        <Contact />
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Rohitha Channamallu | Built with React ⚛️</p>
      </footer>
    </div>
  );
}

export default App;
