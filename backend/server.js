const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config(); // load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------ Middleware ------------------
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
      /\.vercel\.app$/,
    ],
  })
);
app.use(bodyParser.json());

// ------------------ MongoDB Connection ------------------
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ------------------ Models ------------------
const Project = require("./models/Project");
const About = require("./models/About");
const Contact = require("./models/Contact");

function getEmailConfig() {
  const user = (process.env.EMAIL_USER || "").trim();
  const pass = (process.env.EMAIL_PASS || "").replace(/\s/g, "").trim();
  // If RECEIVER_EMAIL is not set, deliver to the same Gmail as EMAIL_USER
  const receiver = (
    process.env.RECEIVER_EMAIL ||
    process.env.EMAIL_USER ||
    ""
  ).trim();

  return { user, pass, receiver };
}

function createMailTransporter() {
  const { user, pass } = getEmailConfig();

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });
}

// ------------------ Routes ------------------

// Root test route
app.get("/", (req, res) => {
  res.send("🚀 Express server is running!");
});

// Optional test projects
app.get("/projects-test", (req, res) => {
  const projects = [
    { id: 1, name: "Portfolio Website", description: "My personal portfolio" },
    { id: 2, name: "Todo App", description: "A simple task manager" },
  ];
  res.json(projects);
});

// About route
app.get("/about", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Projects routes
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/projects", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------ Contact Route (Save + Email) ------------------
app.post("/contact", async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const newMessage = new Contact({ email, message });
    await newMessage.save();

    const { user, pass, receiver } = getEmailConfig();
    const hasEmailConfig = user && pass && receiver;

    if (!hasEmailConfig) {
      return res.json({ msg: "Message sent successfully!" });
    }

    try {
      const transporter = createMailTransporter();

      const info = await transporter.sendMail({
        from: `"Portfolio Contact" <${user}>`,
        replyTo: email,
        to: receiver,
        subject: "New Contact Message",
        text: `From: ${email}\n\nMessage:\n${message}`,
      });

      console.log(`Email sent to ${receiver}:`, info.response);
    } catch (emailError) {
      console.error("Email error:", emailError.message);
    }

    return res.json({ msg: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ msg: "Failed to send message." });
  }
});


// ------------------ Start Server ------------------
app.listen(PORT, () => {
  const { user, receiver } = getEmailConfig();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  if (user && receiver) {
    console.log(`📧 Email notifications enabled for ${receiver}`);
  } else {
    console.log("📧 Email notifications disabled — set EMAIL_USER, EMAIL_PASS, RECEIVER_EMAIL in .env");
  }
  console.log("   Restart this server after any .env changes.");
});
