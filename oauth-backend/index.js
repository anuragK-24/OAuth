require("dotenv").config();
const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    credentials: true,
  })
);

// Google OAuth2 client setup
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_SECRET);

// Google Login Route
app.post("/api/auth/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    // Dynamically use the Google user data
    res.status(200).json({ user: { googleId, email, username: name } });
  } catch (error) {
    console.error("Error in Google Login:", error);
    res.status(401).json({ error: "Google token invalid" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Backend is running on http://localhost:5000");
});
