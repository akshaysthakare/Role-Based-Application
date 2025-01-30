const express = require("express");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  markAsCompleted
} = require("../controllers/taskController");

const router = express.Router();

// Creat task
router.post("/", authMiddleware, roleMiddleware("create"), createTask);

// Get All the Tasks
router.get("/", authMiddleware, getTasks);

// Update Task
router.put("/:id", authMiddleware, roleMiddleware("update"), updateTask);

// Delete Task
router.delete("/:id", authMiddleware, roleMiddleware("delete"), deleteTask);

// Mark Task as Completed
router.put("/:id/complete", authMiddleware, markAsCompleted);

module.exports = router;
