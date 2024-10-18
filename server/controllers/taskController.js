const Task = require('../models/task');
const User= require('../models/user')

// Create a new task
exports.createTask = async (req, res) => {
    const { title, description, priority, dueDate, category } = req.body;
    const userId = req.userId;
    console.log(userId,"llllllllllllllll")
  
    try {
      // Check if the user exists
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Check for existing task with the same title and due date for the user
      const existingTask = await Task.findOne({
        userId,
        title,
        dueDate
      });
  
      if (existingTask) {
        return res.status(400).json({ message: 'Task with the same title and due date already exists.' });
      }
  
      // Create the new task
      const task = new Task({ userId, title, description, priority, dueDate, category });
      await task.save();
  
      res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
// Get all tasks for a specific user
exports.getAllTasks = async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a specific task by ID
exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  console.log(id,"kkkkkkkkkkkk")

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate, completed } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(id, { title, description, priority, dueDate, completed }, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

