import { useEffect, useState } from "react";
import api from "../services/api";

// 🔥 REACT ICONS
import { FiList, FiClock, FiCheckCircle, FiInbox, FiArrowRight } from "react-icons/fi";

export default function DashBoardHome() {

  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DASHBOARD DATA
  const fetchDashboard = async () => {
    try {
      const res = await api.get("/tasks/dashboard");

      setStats(res.data.stats);
      setTasks(res.data.recentTasks);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // 🔥 STATS DATA
  const statsData = [
    {
      title: "Total Tasks",
      value: stats?.totalTasks || 0,
      icon: <FiList />,
      color: "bg-blue-500"
    },
    {
      title: "Active Tasks",
      value: stats?.activeTasks || 0,
      icon: <FiClock />,
      color: "bg-yellow-500"
    },
    {
      title: "Completed Tasks",
      value: stats?.completedTasks || 0,
      icon: <FiCheckCircle />,
      color: "bg-green-500"
    },
    {
      title: "Requests",
      value: stats?.requestsReceived || 0,
      icon: <FiInbox />,
      color: "bg-purple-500"
    }
  ];

  // 🔥 LOADING STATE
  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-10 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your tasks.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition hover:-translate-y-1"
          >

            <div className="flex justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>

              <FiArrowRight className="text-gray-400" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              {stat.value}
            </h3>

            <p className="text-gray-600 text-sm">
              {stat.title}
            </p>

          </div>
        ))}

      </div>

      {/* RECENT TASKS */}
      <div className="bg-white rounded-2xl shadow-md p-6">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            Recent Tasks
          </h2>

          <button className="text-blue-500 hover:text-blue-600 text-sm flex items-center">
            View All <FiArrowRight className="ml-1" />
          </button>
        </div>

        <div className="space-y-3">

          {tasks.length === 0 && (
            <p className="text-gray-500 text-sm">
              No tasks found
            </p>
          )}

          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
            >

              <div>
                <p className="font-medium text-gray-900">
                  {task.title}
                </p>

                <p className="text-xs text-gray-500">
                  {new Date(task.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                ${
                  task.status === "open"
                    ? "bg-yellow-100 text-yellow-700"
                    : task.status === "accepted"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {task.status}
              </span>

            </div>
          ))}

        </div>

      </div>

      {/* QUICK ACTION */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">

        <h2 className="text-xl font-bold mb-2">
          Quick Action
        </h2>

        <p className="text-blue-100 mb-4">
          Need help? Post a new task now!
        </p>

        <button className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
          + Add New Task
        </button>

      </div>

    </div>
  );
}