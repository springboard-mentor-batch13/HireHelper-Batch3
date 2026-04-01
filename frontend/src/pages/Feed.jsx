import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import TaskCard from "../components/TaskCard";

export default function Feed() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestingId, setRequestingId] = useState(null);
  const [requestedTasks, setRequestedTasks] = useState([]);

  // ✅ SAFE USER GET (CRASH FIX)
  const userData = localStorage.getItem("user");
  const user = userData && userData !== "undefined" ? JSON.parse(userData) : null;

  const fetchTasksFunction = async () => {
    try {
      const res = await API.get("/tasks/allTasks");
      setTasks(res.data.tasks || []);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksFunction();
  }, []);

  // 🔥 UPDATED FUNCTION
  const handleRequest = async (taskId, taskOwnerId) => {

    // ✅ FRONTEND CHECK
    if (user && String(taskOwnerId) === String(user._id)) {
      toast.warning("You can't request your own task");
      return;
    }

    try {
      setRequestingId(taskId);

      await API.post("/requests/send", { task_id: taskId });

      setRequestedTasks((prev) => [...prev, taskId]);

      toast.success("Request sent");

      // 🔄 AUTO REFRESH
      setTimeout(() => fetchTasksFunction(), 500);

    } catch (err) {

      // 🔥 BACKEND MESSAGE HANDLE
      const message = err.response?.data?.message;

      if (message === "You cannot request your own task") {
        toast.warning("You can't request your own task");
      } 
      else if (message === "Already requested") {
        toast.info("Already requested");
      } 
      else {
        toast.error("Request failed");
      }

    } finally {
      setRequestingId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 w-full">

      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Task Feed</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Browse tasks and send requests
        </p>
      </div>

      {loading && (
        <p className="text-center mt-20 text-gray-500 animate-pulse">Loading...</p>
      )}

      {!loading && tasks.length === 0 && (
        <p className="text-center mt-20 text-gray-500">
          No tasks available
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            showRequest

            // 🔥 IMPORTANT CHANGE
            onRequest={(id) => handleRequest(id, task.createdBy)}

            requestingId={requestingId}
            isRequested={requestedTasks.includes(task._id)}
          />
        ))}

      </div>

    </div>
  );
}