import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // Changed to accept the form event 'e'
  const handleSend = async (e) => {
    e.preventDefault(); // 🔥 Stops the page from reloading on form submit

    if (!email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setStatus("Sending...");
      const apiBase =
        process.env.REACT_APP_API_URL ||
        (process.env.NODE_ENV === "development"
          ? "http://localhost:5000"
          : "");
      const res = await axios.post(`${apiBase}/contact`, {
        email,
        message,
      });
      setStatus(res.data.msg || "Message sent successfully!");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus(err.response?.data?.msg || "Failed to send message.");
    }
  };

  return (
    <div className="contact-container">
      <h2>
        Contact <span>Me</span>
      </h2>
      <p>Feel free to reach out for collaborations</p>
      
      {/* 1. Wrapped inputs in a <form> tag with onSubmit */}
      <form className="contact-form" onSubmit={handleSend}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required // Browser-level validation
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required // Browser-level validation
        />
        {/* 2. Changed button to type="submit" */}
        <button type="submit">📩 Send Message</button>
      </form>
      
      {status && <p className="status">{status}</p>}
    </div>
  );
}

export default Contact;