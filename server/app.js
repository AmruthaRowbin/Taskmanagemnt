const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const userRouter = require('./routes/user')
const taskrouter =require('./routes/task')
// MongoDB connection
const mongoURI = 'mongodb://0.0.0.0:27017/taskmanagement';

mongoose
  .connect(mongoURI, {
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

app.use('/', userRouter)
app.use('/',taskrouter)


// Start the server
app.listen(5000, () => console.log('Server running on port 5000'));
