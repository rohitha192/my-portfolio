import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();

    if (!email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setStatus("Sending...");
      const apiBase =
        process.env.REACT_APP_API_URL ||
        "https://my-portfolio-backend-w581.onrender.com";
      const res = await axios.post(
        `${apiBase}/contact`,
        { email, message },
        { timeout: 30000 }
      );
      setStatus(res.data.msg || "Message sent successfully!");
      setEmail("");
      setMessage("");
    } catch (err) {
      if (!err.response) {
        setStatus(
          "Could not reach the server. If this persists, the backend may be waking up — try again in a minute."
        );
        return;
      }
      setStatus(err.response?.data?.msg || "Failed to send message.");
    }
  };

  return (
    <div className="contact-container">
      <h2>
        Contact <span>Me</span>
      </h2>
      <p>Feel free to reach out for collaborations</p>

      <form className="contact-form" onSubmit={handleSend}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">📩 Send Message</button>
      </form>

      {status && <p className="status">{status}</p>}
    </div>
  );
}

export default Contact;
