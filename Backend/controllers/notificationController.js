const Notification = require("../models/Notification");

// ================= GET NOTIFICATIONS =================

exports.getNotifications = async (req, res) => {
  try {
    const user_id = req.user.id;

    const notifications = await Notification.find({ user_id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= MARK AS READ =================

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    // 🔴 SECURITY FIX (important)
    if (notification.user_id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized action",
      });
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};