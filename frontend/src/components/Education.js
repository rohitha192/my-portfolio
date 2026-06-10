import React from "react";
import "./Education.css";
import { GraduationCap } from "lucide-react";

const educationTimeline = [
  {
    id: 1,
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Engineering College, Guntur",
    period: "2022 – 2026",
    status: "Undergraduate",
    description:
      "Building a strong foundation in programming, software development, and modern web technologies through coursework and hands-on academic projects.",
    highlights: [
      "Focus on full-stack web development and practical project work",
      "Active in building personal and academic applications outside the classroom",
      "Currently exploring cloud computing and cybersecurity alongside core CS subjects",
    ],
  },
];

function Education() {
  return (
    <div className="education-container">
      <h2 className="education-title">Education</h2>

      <div className="education-timeline">
        {educationTimeline.map((item) => (
          <div className="education-card" key={item.id}>
            <div className="education-card-header">
              <GraduationCap size={28} className="education-icon" />
              <div>
                <h3>{item.degree}</h3>
                <p className="education-meta">
                  {item.institution} · {item.period}
                </p>
                <span className="education-badge">{item.status}</span>
              </div>
            </div>
            <p className="education-description">{item.description}</p>
            <ul className="education-highlights">
              {item.highlights.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Education;
