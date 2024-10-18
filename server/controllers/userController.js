const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register a new user
exports.register =async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name,email,"uuuuuuuuuuuuuuuuuu")
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      // Save user to the database
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ,{ expiresIn: '1h' });
  
      // Return user data and token (excluding password)
      res.status(200).json({
        message: 'Login successful',
        user: {
          _id: user._id,
          name: user.name,
          number: user.number,
          email: user.email,
          status: user.status,
        },
        token, // Include the token in the response
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
