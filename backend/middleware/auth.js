// backend/middleware/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) return res.status(401).json({ message: "Not authorized (no token)" });

    const payload = jwt.verify(token, JWT_SECRET);
    // put user info on req (if desired)
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized (invalid token)" });
  }
}

module.exports = authMiddleware;
