import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import TaskCard from "../components/TaskCard";

export default function MyTasks() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyTasks = async () => {
      try {
        const res = await API.get("/tasks/myTask");
        setTasks(res.data.tasks || []);
      } catch (err) {
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchMyTasks();
  }, []);

  return (
    <div className="p-6 "> {/* 🔥 SAME FIX */}

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-500 text-sm">
          Manage your posted tasks
        </p>
      </div>

      {loading && <p className="text-center mt-20 text-gray-500">Loading...</p>}

      {!loading && tasks.length === 0 && (
        <p className="text-center mt-20 text-gray-500">No tasks found</p>
      )}

      {!loading && tasks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}

    </div>
  );
}