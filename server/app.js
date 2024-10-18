const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

// MongoDB connection


mongoose
  .connect(process.env.mongoURI, { // Added a comma here
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB has been started successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Routes
app.use('/', userRouter);
app.use('/', taskRouter); // Corrected 'taskrouter' to 'taskRouter'

// Start the server
app.listen(5000, () => console.log('Server running on port 5000'));
