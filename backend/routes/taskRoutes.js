import express from 'express';
import { getTasks, createTask, toggleTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

// RESTful API Endpoints
router.get('/', getTasks);          // Get all tasks
router.post('/', createTask);        // Create a task
router.patch('/:id', toggleTask);   // Toggle status
router.delete('/:id', deleteTask);   // Delete a task

export default router;