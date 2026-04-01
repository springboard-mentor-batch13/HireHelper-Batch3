const Task = require("../models/Task");
const Request = require("../models/Request");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// -------------------------CHECK FILE TYPE -------------------------

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}


// ----------------- CREATE TASK -------------------------

exports.createTask = async (req, res) => {
  try {

    const { title, description, location, start_time, end_time } = req.body || {};
    const userId = req.user.id;

    let imageUrl = "";

    // ✅ CHECK IF IMAGE EXISTS
    if (req.files && req.files.picture) {

      const file = req.files.picture;

      const supportedTypes = ["jpg", "jpeg", "png"];
      const fileType = file.name.split(".")[1].toLowerCase();

      if (!isFileTypeSupported(fileType, supportedTypes)) {
        return res.status(400).json({
          success: false,
          message: "File Format is not supported",
        });
      }

      // upload to cloudinary
      const response = await uploadImageToCloudinary(file, "hirehelper");
      imageUrl = response.secure_url;
    }

    // ✅ CREATE TASK (WITH OR WITHOUT IMAGE)
    const task = await Task.create({
      createdBy: userId,
      title,
      description,
      location,
      start_time,
      end_time,
      picture: imageUrl,
    });

    res.status(200).json({
      success: true,
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// ------------------------- GET ALL TASKS -------------------------

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("createdBy", "first_name email_id").sort({ createdAt: -1 });

    // 🔥 ADD REQUEST COUNT TO EACH TASK
    const tasksWithRequestCount = await Promise.all(
      tasks.map(async (task) => {
        const requestCount = await Request.countDocuments({
          task_id: task._id,
          status: "pending"
        });
        return {
          ...task.toObject(),
          requestCount
        };
      })
    );

    res.status(200).json({
      success: true,
      tasks: tasksWithRequestCount,
    });
  }
  catch (error) {
    console.error("GET ALL TASK ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------------- GET MY TASKS -------------------------

exports.getMyTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({
      createdBy: userId,
    })
    .sort({ createdAt: -1 });

    // 🔥 ADD REQUEST COUNT TO EACH TASK
    const tasksWithRequestCount = await Promise.all(
      tasks.map(async (task) => {
        const requestCount = await Request.countDocuments({
          task_id: task._id,
          status: "pending"
        });
        return {
          ...task.toObject(),
          requestCount
        };
      })
    );

    res.status(200).json({
      success: true,
      tasks: tasksWithRequestCount,
    });
  }
  catch (error) {
    console.error("GET MY TASK ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------------------------DashBoard Data------------------------------------

exports.getDashboardData = async (req, res) => {
  try {

    const userId = req.user.id;

    // ---------------- TASK STATS ----------------
    const totalTasks = await Task.countDocuments({ createdBy: userId });

    const activeTasks = await Task.countDocuments({
      createdBy: userId,
      status: { $in: ["open", "accepted"] }
    });

    const completedTasks = await Task.countDocuments({
      createdBy: userId,
      status: "completed"
    });

    // ---------------- REQUESTS ----------------
    const requests = await Request.find().populate("task_id");

    const requestsReceived = requests.filter(
      (r) => r.task_id?.createdBy?.toString() === userId
    ).length;

    // ---------------- RECENT TASKS ----------------
    const recentTasks = await Task.find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalTasks,
        activeTasks,
        completedTasks,
        requestsReceived
      },
      recentTasks
    });

  } catch (error) {
    console.log("DASHBOARD ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard data"
    });
  }
};


// -----------------------Update Task-------------------------

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = req.body;

    // 🔥 IMAGE HANDLE
    if (req.files && req.files.picture) {
      const file = req.files.picture;

      const response = await uploadImageToCloudinary(file, "hirehelper");
      updateData.picture = response.secure_url;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updateData }, // 🔥 IMPORTANT FIX
      { new: true }
    );

    res.status(200).json({
      success: true,
      task: updatedTask,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};

// --------------------Delete Task -----------------------

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ------------------- Mark Completed -----------------------

exports.markTaskCompleted = async (req, res) => {
  try {
    const { taskId } = req.params;

    // 🔍 1. FIND TASK
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔁 2. HANDLE ALREADY COMPLETED (IMPORTANT 🔥)
    if (task.status === "completed") {
      return res.status(200).json({
        success: true,
        message: "Already completed",
      });
    }

    // ✅ 3. MARK TASK COMPLETED
    task.status = "completed";
    await task.save();

    // 🔍 4. GET ACCEPTED REQUEST
    const acceptedRequest = await Request.findOne({
      task_id: taskId,
      requester_id: task.helper_id, // 🔥 more accurate
    });

    if (acceptedRequest) {
      // ⚠️ only update if schema allows "completed"
      acceptedRequest.status = "completed";
      await acceptedRequest.save();

      // 🔔 5. SEND NOTIFICATION
      const owner = await User.findById(req.user.id);

      await Notification.create({
        user_id: acceptedRequest.requester_id,
        body: `${owner.first_name} ${owner.last_name} completed your task "${task.title}"`,
      });

    } else {
      console.log("⚠️ No accepted request found");
    }

    res.status(200).json({
      success: true,
      message: "Task completed successfully",
    });

  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ message: "Failed to complete" });
  }
};