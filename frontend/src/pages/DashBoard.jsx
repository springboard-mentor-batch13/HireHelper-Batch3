import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/SideBar";
import DashBoardHeader from "../components/DashBoardHeader";

export default function DashBoard() {

  const location = useLocation();
  const navigate = useNavigate();

  // 🔐 protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const headerConfig = {

    "/dashboard/feed": {
      title: "Task Feed",
      subtitle: "Find tasks that need help"
    },

    "/dashboard/my-tasks": {
      title: "My Tasks",
      subtitle: "Manage your posted tasks"
    },

    "/dashboard/add-task": {
      title: "Add Task",
      subtitle: "Create a new task"
    },

    "/dashboard/requests": {
      title: "Requests",
      subtitle: "People who want to help in your Tasks"
    },

    "/dashboard/myRequests": {
      title: "My Requests",
      subtitle: "Track your task requests"
    },

    "/dashboard/settings": {
      title: "Settings",
      subtitle: "Manage your account"
    }

  };

  const header = headerConfig[location.pathname] || {
    title: "Dashboard",
    subtitle: "Welcome to HireHelper"
  };

  return (
    <div className="flex bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 ml-50 min-h-screen">

        {/* Header */}
        <DashBoardHeader
          title={header.title}
          subtitle={header.subtitle}
        />

        {/* Content */}
        <Outlet />

      </div>

    </div>
  );
}