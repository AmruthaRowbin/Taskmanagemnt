const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET="your_jwt_secret"

const authMiddleware = (req, res, next) => {
  // Get token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1];
  console.log("Token received:", token); // For debugging

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.userId = decoded.userId; // Assign userId from the decoded token to req.userId
    console.log("Decoded userId:", req.userId); // For debugging
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error); // Log the error for debugging
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
