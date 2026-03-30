const express = require("express");
const router = express.Router();

const {createTask,getAllTasks,getMyTasks, getDashboardData } = require("../controllers/taskController");
const { authMiddleware } = require("../middleware/auth");



router.post("/create", authMiddleware, createTask);
router.get("/allTasks", authMiddleware, getAllTasks);
router.get("/myTask", authMiddleware, getMyTasks);
router.get("/dashboard", authMiddleware, getDashboardData);


module.exports = router;