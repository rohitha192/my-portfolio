const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config(); // load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------ Middleware ------------------
const allowedOrigins = [
  "http://localhost:3000",
  ...(process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
    : []),
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (/\.vercel\.app$/i.test(origin)) return callback(null, true);
      if (/\.onrender\.com$/i.test(origin)) return callback(null, true);
      callback(null, true);
    },
  })
);
app.use(bodyParser.json());

// ------------------ MongoDB Connection ------------------
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

mongoose.set("bufferCommands", false);

const mongoOptions = {
  serverSelectionTimeoutMS: 10000,
};

function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

function redactMongoUri(uri) {
  if (!uri) return "(not set)";
  return uri.replace(/\/\/([^:]+):([^@]+)@/, "//$1:***@");
}

function logMongoStatus(context) {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  const state = states[mongoose.connection.readyState] || "unknown";
  console.log(
    `[MongoDB${context ? ` · ${context}` : ""}] state=${state}, db="${mongoose.connection.name || "n/a"}"`
  );
}

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
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

async function sendContactEmail({ user, receiver, email, message }) {
  console.log(`[Contact · email] sending notification to ${receiver} (from visitor: ${email})`);

  const transporter = createMailTransporter();

  const info = await transporter.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    replyTo: email,
    to: receiver,
    subject: "New Contact Message",
    text: `From: ${email}\n\nMessage:\n${message}`,
  });

  console.log(`[Contact · email] sent successfully → ${receiver}: ${info.response}`);
}

// ------------------ Routes ------------------

// Root test route
app.get("/", (req, res) => {
  res.send("🚀 Express server is running!");
});

app.get("/health", (req, res) => {
  res.json({
    ok: isDbConnected(),
    db: isDbConnected() ? "connected" : "disconnected",
  });
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

  console.log("[Contact] request received", {
    email,
    messageLength: message?.length || 0,
    dbConnected: isDbConnected(),
  });

  if (!email || !message) {
    console.log("[Contact] rejected — missing fields");
    return res.status(400).json({ msg: "All fields are required" });
  }

  if (!isDbConnected()) {
    logMongoStatus("contact blocked");
    return res.status(503).json({
      msg: "Database unavailable. Please try again in a moment.",
    });
  }

  try {
    const newMessage = new Contact({ email, message });
    await newMessage.save();
    console.log("[Contact · db] message saved", { id: newMessage._id.toString() });

    const { user, pass, receiver } = getEmailConfig();
    const hasEmailConfig = user && pass && receiver;

    console.log("[Contact · email] config check", {
      hasEmailUser: !!user,
      hasEmailPass: !!pass,
      receiver: receiver || "(not set)",
      willSendEmail: hasEmailConfig,
    });

    if (hasEmailConfig) {
      sendContactEmail({ user, receiver, email, message }).catch((emailError) => {
        console.error("[Contact · email] failed:", emailError.message);
      });
    } else {
      console.log("[Contact · email] skipped — EMAIL_USER, EMAIL_PASS, or RECEIVER_EMAIL missing");
    }

    return res.json({ msg: "Message sent successfully!" });
  } catch (error) {
    console.error("[Contact] failed:", error.message);
    res.status(500).json({ msg: "Failed to send message." });
  }
});


// ------------------ Start Server ------------------
async function startServer() {
  mongoose.connection.on("connected", () => logMongoStatus("event connected"));
  mongoose.connection.on("disconnected", () => logMongoStatus("event disconnected"));
  mongoose.connection.on("error", (err) => {
    console.error("[MongoDB · error]", err.message);
  });

  console.log("[MongoDB] connecting to", redactMongoUri(MONGODB_URI));

  try {
    await mongoose.connect(MONGODB_URI, mongoOptions);
    console.log("✅ MongoDB connected");
    logMongoStatus("startup");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    logMongoStatus("startup failed");
    console.error(
      "   Set MONGODB_URI on Render and allow 0.0.0.0/0 in Atlas Network Access."
    );
  }

  app.listen(PORT, () => {
    const { user, pass, receiver } = getEmailConfig();
    console.log(`🚀 Server running on port ${PORT}`);
    console.log("[MongoDB] MONGODB_URI set:", !!process.env.MONGODB_URI);
    logMongoStatus("server ready");
    if (user && pass && receiver) {
      console.log(`📧 Email notifications enabled for ${receiver}`);
    } else {
      console.log(
        "📧 Email notifications disabled — set EMAIL_USER, EMAIL_PASS, RECEIVER_EMAIL in .env"
      );
      console.log("[Contact · email] env check", {
        hasEmailUser: !!user,
        hasEmailPass: !!pass,
        hasReceiver: !!receiver,
      });
    }
    console.log("   Restart this server after any .env changes.");
  });
}

startServer();
