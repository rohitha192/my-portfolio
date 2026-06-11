require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const user = (process.env.EMAIL_USER || "").trim();
const pass = (process.env.EMAIL_PASS || "").replace(/\s/g, "").trim();
const receiver = (process.env.RECEIVER_EMAIL || "").trim();

console.log("EMAIL_USER set:", !!user, "| looks like email:", user.includes("@"));
console.log("EMAIL_PASS length:", pass.length, "(app passwords are usually 16 chars)");
console.log("EMAIL_PASS has quotes:", /^["']|["']$/.test(process.env.EMAIL_PASS || ""));
console.log("RECEIVER_EMAIL set:", !!receiver);

if (pass.length !== 16) {
  console.log("\nHint: Gmail app passwords are 16 characters with no spaces.");
  console.log("If Google showed 'abcd efgh ijkl mnop', use: abcdefghijklmnop");
}


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: { user, pass },
});

transporter
  .verify()
  .then(() => console.log("\n✅ Gmail SMTP login successful"))
  .catch((err) => {
    console.error("\n❌ Gmail SMTP login failed:", err.message);
    if (err.code === "EAUTH") {
      console.log("\nFix checklist:");
      console.log("1. Enable 2-Step Verification on the Google account");
      console.log("2. Create an App Password: https://myaccount.google.com/apppasswords");
      console.log("3. Use the 16-char app password in EMAIL_PASS (not your normal Gmail password)");
      console.log("4. EMAIL_USER must be the same Gmail account that owns the app password");
      console.log("5. Restart backend after editing backend/.env");
    }
  });
