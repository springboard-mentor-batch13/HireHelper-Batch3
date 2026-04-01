import { FiSearch, FiBell } from "react-icons/fi";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function DashBoardHeader({ title, subtitle }) {

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // 🔥 FETCH NOTIFICATIONS
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      console.log("NOTIFICATIONS:", res.data); // debug
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.log("Notification error:", err);
    }
  };

  // 🔥 HANDLE CLICK
  const handleNotificationClick = async (n) => {
    try {
      await api.put(`/notifications/read/${n._id}`);

      // update UI instantly
      setNotifications(prev =>
        prev.map(item =>
          item._id === n._id ? { ...item, isRead: true } : item
        )
      );

      // 🔥 SAFE NAVIGATION
      const text = n.body.toLowerCase();

      if (text.includes("requested")) {
        navigate("/dashboard/requests");
      } else if (text.includes("accepted")) {
        navigate("/dashboard/myRequests");
      }

      setOpen(false);

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 TOGGLE DROPDOWN
  const handleToggle = () => {
    setOpen(prev => !prev);
    fetchNotifications(); // refresh when opened
  };

  // 🔥 AUTO REFRESH (VERY IMPORTANT)
  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 3000); // every 3 sec

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="bg-white px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b">

      {/* LEFT */}
      <div className="w-full sm:w-auto">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
          {title}
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          {subtitle}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">

        {/* SEARCH */}
        <div className="hidden lg:flex items-center bg-gray-100 border px-3 py-1 rounded-lg flex-1 sm:flex-none">
          <FiSearch className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="outline-none ml-2 text-sm bg-transparent w-32 lg:w-40"
          />
        </div>

        {/* 🔔 NOTIFICATION */}
        <div className="relative flex-shrink-0">

          <button onClick={handleToggle} className="p-1">
            <FiBell size={18} />
          </button>

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
              {unreadCount}
            </span>
          )}

          {open && (
            <div className="absolute right-0 mt-3 w-80 max-w-[calc(100vw-1rem)] bg-white shadow-xl rounded-xl border z-50">

              {/* EMPTY */}
              {notifications.length === 0 && (
                <p className="p-4 text-sm text-gray-500">
                  No notifications
                </p>
              )}

              {/* LIST */}
              {notifications.map(n => (
                <div
                  key={n._id}
                  onClick={() => handleNotificationClick(n)}
                  className="flex items-start gap-3 p-4 border-b hover:bg-gray-50 cursor-pointer transition"
                >

                  {/* AVATAR */}
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {n.body?.[0]}
                  </div>

                  {/* TEXT */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 break-words">
                      {n.body}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* UNREAD DOT */}
                  {!n.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  )}

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}