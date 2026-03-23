const express = require("express");
const router = express.Router();

const { getNotifications, markAsRead } = require("../controllers/notificationController");

const { authMiddleware } = require("../middleware/auth");

router.get("/", authMiddleware, getNotifications);

router.put("/read/:id", authMiddleware, markAsRead);

module.exports = router;