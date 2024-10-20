const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = "your_jwt_secret";

const auth = async (req, res, next) => {
  try {
    // Log the entire headers to verify the token is passed correctly
    console.log("Request Headers:", req.headers);

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authorization token is missing!" });
    }

    console.log("Token received:", token);

    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      // Log custom authentication flow
      console.log("Using custom authentication...");

      decodedData = jwt.verify(token, JWT_SECRET);
      console.log("Decoded Data:", decodedData);
      req.userId = decodedData?.id;
    } else {
      // Log third-party authentication flow
      console.log("Using third-party authentication...");

      decodedData = jwt.decode(token);
      console.log("Decoded Token:", decodedData);
      
      const userId = decodedData?.sub.toString();
      console.log("Decoded User ID:", userId);

      // Find user by decoded userId and log the result
      const user = await User.findOne({ userId });
      console.log("User found in database:", user);

      req.userId = user?._id;
    }

    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(500).json({ message: "Authentication failed!" });
  }
};

module.exports = auth;
