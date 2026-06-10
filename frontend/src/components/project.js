import React from "react";
import "./Project.css";
import { FaGithub } from "react-icons/fa";

const GITHUB_PROFILE = "https://github.com/rohitha192";

const projects = [
  {
    title: "Basic Calculator",
    description:
      "A web calculator built with React frontend and Express backend to perform arithmetic operations.",
    image: "/projext1.png",
    tech: ["React", "Express", "JavaScript"],
    github: "https://github.com/rohitha192/Basic-Calculator",
    repoName: "Basic-Calculator",
  },
  {
    title: "ChatBot",
    description:
      "A simple chatbot with a Python backend connected to a React frontend using Google Colab.",
    image: "/Project2.png",
    tech: ["React", "Python", "JavaScript"],
    github: "https://github.com/rohitha192/Chatbot",
    repoName: "Chatbot",
  },
  {
    title: "Campus Guide AI",
    description:
      "An AI-powered campus guide using LangChain and OpenAI to help students navigate campus and find information.",
    image: "/project3.png",
    tech: ["JavaScript", "LangChain", "OpenAI API"],
    github: "https://github.com/rohitha192/campus-guide",
    repoName: "campus-guide",
  },
  {
    title: "Medication Smart AI",
    description:
      "A website that displays different diseases and health information for various age groups and categories.",
    image:"/Project2.png",
    tech: ["JavaScript", "React", "AI"],
    github: "https://github.com/rohitha192/Medication-smart-AI",
    repoName: "Medication-smart-AI",
  },
  
];

function Project() {
  return (
    <section className="projects-section">
      <h2 className="projects-title">My Projects</h2>
      <a
        href={GITHUB_PROFILE}
        target="_blank"
        rel="noopener noreferrer"
        className="github-profile-link"
      >
        <FaGithub /> View My GitHub Profile
      </a>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.repoName} className="project-card">
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
            )}
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-stack">
                {project.tech.map((t) => (
                  <span key={t} className="tech-badge">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-github-link"
              >
                <FaGithub /> {project.repoName}
              </a>
            </div>

            <div className="overlay">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn github-btn"
              >
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Project;
