// backend/routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // used if you want to hash; here we compare plaintext env for demo
require("dotenv").config();

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// For a quick demo we read admin creds from .env
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // production: store hashed in DB

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing username or password" });

    // Demo check: compare with environment values.
    // In production compare bcrypt.compare(password, user.hashedPasswordFromDB)
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT payload - add minimal info
    const payload = { username };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Return token (frontend will store it)
    return res.json({ token, expiresIn: JWT_EXPIRES_IN });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Login error" });
  }
});

// optional endpoint to validate token & get user info
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (!token) return res.status(200).json({ authenticated: false });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return res.json({ authenticated: true, user: payload });
  } catch (err) {
    return res.status(200).json({ authenticated: false });
  }
});

module.exports = router;
