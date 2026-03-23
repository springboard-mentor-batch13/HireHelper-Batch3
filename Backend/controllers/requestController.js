const Request = require("../models/Request");
const Task = require("../models/Task");
const User = require("../models/User");
const Notification = require("../models/Notification");
const AcceptedTask = require("../models/AcceptedTask");

// ================= SEND REQUEST =================

exports.sendRequest = async (req, res) => {
  try {
    const { task_id } = req.body;
    const requester_id = req.user.id;

    const task = await Task.findById(task_id).select("createdBy");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // prevent requesting own task
    if (task.createdBy.toString() === requester_id) {
      return res.status(400).json({
        success: false,
        message: "You cannot request your own task",
      });
    }

    // check duplicate request
    const existingRequest = await Request.findOne({
      task_id,
      requester_id,
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Request already sent",
      });
    }

    const request = await Request.create({
      task_id,
      requester_id,
    });

    // create notification for task owner
    const user = await User.findById(requester_id).select("first_name");

    await Notification.create({
      user_id: task.createdBy,
      body: `${user?.first_name || "Someone"} requested your task`,
    });

    res.status(200).json({
      success: true,
      message: "Request sent successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET REQUESTS (OWNER) =================

exports.getRequestsForOwner = async (req, res) => {
  try {
    const user_id = req.user.id;

    const tasks = await Task.find({ createdBy: user_id }).select("_id");

    const taskIds = tasks.map((task) => task._id);

    const requests = await Request.find({
      task_id: { $in: taskIds },
    })
      .populate("requester_id", "first_name last_name profile_picture")
      .populate("task_id", "title description location start_time end_time picture");

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= MY REQUESTS =================

exports.getMyRequests = async (req, res) => {
  try {
    const requester_id = req.user.id;

    const requests = await Request.find({ requester_id }).populate(
      "task_id",
      "title description location start_time end_time picture"
    );

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= ACCEPT REQUEST =================

exports.acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    // 🔴 SECURITY FIX (very important)
    const task = await Task.findById(request.task_id);

    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized action",
      });
    }

    // check if task already accepted
    const alreadyAccepted = await AcceptedTask.findOne({
      task_id: request.task_id,
    });

    if (alreadyAccepted) {
      return res.status(400).json({
        success: false,
        message: "Task already assigned",
      });
    }

    request.status = "accepted";
    await request.save();

    // reject other requests
    await Request.updateMany(
      { task_id: request.task_id, _id: { $ne: requestId } },
      { status: "rejected" }
    );

    // create accepted task entry
    await AcceptedTask.create({
      user_id: request.requester_id,
      task_id: request.task_id,
    });

    // improved notification
    const taskData = await Task.findById(request.task_id).select("title");

    await Notification.create({
      user_id: request.requester_id,
      body: `Your request for "${taskData.title}" has been accepted`,
    });

    res.status(200).json({
      success: true,
      message: "Request accepted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= REJECT REQUEST =================

exports.rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    // 🔴 SECURITY FIX
    const task = await Task.findById(request.task_id);

    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized action",
      });
    }

    request.status = "rejected";
    await request.save();

    // improved notification
    const taskData = await Task.findById(request.task_id).select("title");

    await Notification.create({
      user_id: request.requester_id,
      body: `Your request for "${taskData.title}" has been rejected`,
    });

    res.status(200).json({
      success: true,
      message: "Request rejected",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};