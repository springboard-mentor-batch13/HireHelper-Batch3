import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

import {
  FiHome,
  FiList,
  FiPlus,
  FiSend,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX
} from "react-icons/fi";

export default function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  // ================= FETCH USER =================
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

  // 🔥 REFRESH ON ROUTE CHANGE
  useEffect(() => {
    fetchUser();
  }, [location.pathname]);

  const menu = [
    { name: "Feed", path: "/dashboard/feed", icon: <FiHome /> },
    { name: "My Tasks", path: "/dashboard/my-tasks", icon: <FiList /> },
    { name: "Add Task", path: "/dashboard/add-task", icon: <FiPlus /> },
    { name: "Requests", path: "/dashboard/requests", icon: <FiSend /> },
    { name: "My Requests", path: "/dashboard/myRequests", icon: <FiSend /> },
    { name: "Settings", path: "/dashboard/settings", icon: <FiSettings /> }
  ];

  return (
    <>
      {/* HAMBURGER MENU - Mobile Only */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-blue-600 text-white rounded-lg"
      >
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* BACKDROP - Mobile Only */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-30"
        />
      )}

      {/* SIDEBAR */}
      <div className={`w-52 bg-white border-r h-screen fixed left-0 top-0 flex flex-col justify-between z-40 transition-transform duration-300 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>

      {/* ================= TOP ================= */}
      <div>

        {/* LOGO */}
        <Link to="/dashboard" onClick={() => setSidebarOpen(false)}>
        <h1 className="text-lg font-bold text-blue-600 p-6 truncate">
          Hire-a-Helper
        </h1></Link>

        {/* MENU */}
        <nav className="px-3 space-y-2">
          {menu.map(item => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
              ${location.pathname === item.path
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="truncate">{item.name}</span>
            </Link>
          ))}
        </nav>

      </div>

      {/* ================= BOTTOM ================= */}
      <div className="p-3 border-t bg-gray-50">

        {/* PROFILE */}
        <Link to="/dashboard/settings">
            <div className="flex items-center gap-3 mb-3">

          {/* PROFILE IMAGE / FALLBACK */}
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shadow">

            {user?.profile_picture ? (
              <img
                src={user.profile_picture}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white font-semibold">
                {user?.first_name?.[0] || "U"}
              </div>
            )}

          </div>

          {/* USER INFO */}
          <div className="leading-tight overflow-hidden">
            <p className="text-sm font-semibold text-gray-800 truncate max-w-[140px]">
              {user?.first_name || "User"} {user?.last_name || ""}
            </p>

            <p className="text-xs text-gray-500 truncate max-w-[140px]">
              {user?.email_id || "No email"}
            </p>
          </div>

        </div>
        </Link>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition px-3 py-2"
        >
          <FiLogOut className="text-lg" />
          <span className="truncate">Logout</span>
        </button>

      </div>

      </div>

    </>
  );
}