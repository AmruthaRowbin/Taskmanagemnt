const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

// POST /api/tasks
router.post('/task', authMiddleware, createTask);

// GET /api/tasks/:userId
router.get('/task/:userId',authMiddleware, getAllTasks);

// GET /api/tasks/:id
router.get('/:id',authMiddleware, getTaskById);

// PUT /api/tasks/:id
router.put('/task/:id', authMiddleware,updateTask);

// DELETE /api/tasks/:id
router.delete('/:id', authMiddleware,deleteTask);

module.exports = router;
