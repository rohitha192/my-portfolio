import React from "react";
import "./Certifications.css";

// Images in public/certifications/ use simple names (no spaces) so they load reliably
const certImage = (filename) =>
  `${process.env.PUBLIC_URL}/certifications/${filename}`;

const technicalCerts = [
  {
    id: 1,
    name: "Cisco Packet Tracer — Networking Essentials",
    image: certImage("cisco-networking-essentials.png"),
  },
  {
    id: 2,
    name: "Introduction to Packet Tracer",
    image: certImage("cisco-intro-packet-tracer.png"),
  },
  {
    id: 3,
    name: "Cisco Python Essentials",
    image: certImage("cisco-python-essentials.png"),
  },
  {
    id: 4,
    name: "CodeChef Badge",
    image: certImage("codechef-badge-2.png"),
  },
  {
    id: 5,
    name: "CodeChef Badge",
    image: certImage("codechef-badge-3.png"),
  },
  {
    id: 6,
    name: "CodeChef Badge",
    image: certImage("codechef-badge-4.png"),
  },
  {
    id: 7,
    name: "CodeChef Badge",
    image: certImage("codechef-badge-5.png"),
  },
  {
    id: 8,
    name: "CodeChef — Problem Solving",
    image: certImage("codechef-difficulty.png"),
  },
  {
    id: 9,
    name: "HP Life Skills",
    image: certImage("hp-lite.png"),
  },
  {
    id: 10,
    name: "LeetCode",
    image: certImage("leetcode.png"),
  },
];

const nonTechnicalCerts = [
  {
    id: 1,
    name: "Kabaddi",
    image: certImage("kabbadi.png"),
  },
  {
    id: 2,
    name: "Public Speaking",
    image: certImage("public-speaking.png"),
  },
  {
    id: 3,
    name: "Music",
    image: certImage("music.png"),
  },
  {
    id: 4,
    name: "NSS Coordinator",
    image: certImage("nss-activity.png"),
  },
  {
    id: 5,
    name: "National Event Coordinator",
    image: certImage("mahostav-appreciation.jpg"),
  },
];

function CertCard({ cert }) {
  return (
    <div className="cert-card">
      <div className="cert-image-wrap">
        <img
          src={cert.image}
          alt={cert.name}
          className="cert-image"
          loading="lazy"
        />
      </div>
      <p className="cert-name">{cert.name}</p>
    </div>
  );
}

function Certifications() {
  return (
    <div className="certifications-container">
      <h2 className="cert-section-title">Technical Certifications</h2>
      <div className="cert-grid">
        {technicalCerts.map((cert) => (
          <CertCard key={cert.id} cert={cert} />
        ))}
      </div>

      <h2 className="cert-section-title">Non-Technical Certifications</h2>
      <div className="cert-grid">
        {nonTechnicalCerts.map((cert) => (
          <CertCard key={cert.id} cert={cert} />
        ))}
      </div>
    </div>
  );
}

export default Certifications;
