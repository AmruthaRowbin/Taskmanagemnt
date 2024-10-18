const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// POST /api/tasks
router.post('/task', createTask);

// GET /api/tasks/:userId
router.get('/task/:userId', getAllTasks);

// GET /api/tasks/:id
router.get('/:id', getTaskById);

// PUT /api/tasks/:id
router.put('/task/:id', updateTask);

// DELETE /api/tasks/:id
router.delete('/:id', deleteTask);

module.exports = router;
