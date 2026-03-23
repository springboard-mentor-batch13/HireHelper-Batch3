import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

import {
  FiHome,
  FiList,
  FiPlus,
  FiSend,
  FiSettings,
  FiLogOut
} from "react-icons/fi";

export default function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  // 🔥 Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const menu = [
    { name: "Feed", path: "/dashboard/feed", icon: <FiHome/> },
    { name: "My Tasks", path: "/dashboard/my-tasks", icon: <FiList/> },
    { name: "Add Task", path: "/dashboard/add-task", icon: <FiPlus/> },
    { name: "Requests", path: "/dashboard/requests", icon: <FiSend/> },
    { name: "My Requests", path: "/dashboard/myRequests", icon: <FiSend/> },
    { name: "Settings", path: "/dashboard/settings", icon: <FiSettings/> }
  ];

  return (
    <div className="w-53 bg-white border-r h-screen fixed left-0 top-0 flex flex-col justify-between">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <h1 className="text-xl font-bold text-blue-600 p-6">
          Hire-a-Helper
        </h1>

        {/* MENU */}
        <nav className="px-3 space-y-2">
          {menu.map(item => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
              ${location.pathname === item.path
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"}`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

      </div>

      {/* BOTTOM */}
      <div className="p-2 border-t bg-gray-50">

        {/* PROFILE */}
        <div className="flex items-center gap-3 mb-3">

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center  font-semibold shadow">
            {user?.first_name?.[0] || "U"}
          </div>

          {/* User Info */}
          <div className="leading-tight overflow-hidden">
            <p className="text-sm font-semibold text-gray-800 truncate max-w-[130px]">
              {user?.first_name || "User"} {user?.last_name || ""}
            </p>

            <p className="text-xs text-gray-500 truncate max-w-[130px]">
              {user?.email_id || "No email"}
            </p>
          </div>

        </div>
       

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition"
        >
          <FiLogOut className="text-lg"/>
          Logout
        </button>

      </div>

    </div>
  );
}