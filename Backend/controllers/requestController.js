const Request = require("../models/Request");
const Task = require("../models/Task");
const Notification = require("../models/Notification");
const User = require("../models/User");

// ---------------- SEND REQUEST ----------------
exports.sendRequest = async (req, res) => {
  try {
    const { task_id } = req.body;
    const requester_id = req.user.id;

    const task = await Task.findById(task_id);

    // 🔥 NEW CHECK (MOST IMPORTANT)
    if (String(task.createdBy) === String(requester_id)) {
      return res.status(400).json({
        message: "You cannot request your own task",
      });
    }

    const existing = await Request.findOne({ task_id, requester_id });
    if (existing) {
      return res.status(400).json({ message: "Already requested" });
    }

    const request = await Request.create({
      task_id,
      requester_id,
    });

    // 🔔 CREATE NOTIFICATION FOR TASK OWNER
    const requester = await User.findById(requester_id);
    await Notification.create({
      user_id: task.createdBy,
      body: `${requester.first_name} ${requester.last_name} requested your task: ${task.title}`,
    });

    res.json({ success: true, request });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- GET REQUESTS (OWNER) ----------------
exports.getRequestsForOwner = async (req, res) => {
  try {
    const user_id = req.user.id;

    const tasks = await Task.find({ createdBy: user_id }).select("_id");
    const taskIds = tasks.map((t) => t._id);

    const requests = await Request.find({
      task_id: { $in: taskIds },
    })
      .sort({ createdAt: -1 })
      .populate("requester_id", "first_name last_name profile_picture")
      .populate(
        "task_id",
        "title description location start_time end_time profile_picture status"
      );

    res.json({ success: true, requests });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- MY REQUESTS ----------------
exports.getMyRequests = async (req, res) => {
  try {
    const requester_id = req.user.id;

    const requests = await Request.find({ requester_id }).sort({ createdAt: -1 })
      .populate({
        path: "task_id",
        select:
          "title description location start_time end_time profile_picture createdBy status",
        populate: {
          path: "createdBy",
          select: "first_name last_name profile_picture",
        },
      });

    res.json({ success: true, requests });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- ACCEPT ----------------
exports.acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "accepted";
    await request.save();

    // 🔥 REMOVED: No longer reject other requests automatically
    // Now you can accept multiple people for the same task

    // 🔥 OWNER (jo accept kar raha hai)
    const owner = await User.findById(req.user.id);

    // 🔔 NOTIFICATION (to requester)
    await Notification.create({
      user_id: request.requester_id,
      body: `${owner.first_name} ${owner.last_name} accepted your request`,
    });

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- REJECT ----------------
exports.rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    await Request.findByIdAndUpdate(requestId, {
      status: "rejected",
    });

    // 🔥 OWNER
    const owner = await User.findById(req.user.id);

    // 🔔 NOTIFICATION (to requester)
    await Notification.create({
      user_id: request.requester_id,
      body: `${owner.first_name} ${owner.last_name} rejected your request`,
    });

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- CANCEL ----------------
exports.cancelRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user.id;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (String(request.requester_id) !== String(userId)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Only pending can cancel" });
    }

    await Request.findByIdAndDelete(requestId);

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};