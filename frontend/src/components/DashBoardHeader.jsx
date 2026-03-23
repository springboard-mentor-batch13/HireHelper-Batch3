import { FiSearch, FiBell } from "react-icons/fi";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function DashBoardHeader({ title, subtitle }) {

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data.notifications);
    } catch (err) {
      console.log(err);
    }
  };

  // click notification
  const handleNotificationClick = async (n) => {
    try {

      await api.put(`/notifications/read/${n._id}`);

      // update UI instantly
      setNotifications(prev =>
        prev.map(item =>
          item._id === n._id ? { ...item, isRead: true } : item
        )
      );

      if (n.body.includes("requested")) {
        navigate("/dashboard/requests");
      } else if (n.body.includes("accepted")) {
        navigate("/dashboard/myRequests");
      }

      setOpen(false);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (

    <div className="bg-white px-6 py-2.5 flex justify-between items-center">

      {/* LEFT */}
      <div>
        <h1 className="text-xl px-4 font-semibold text-gray-800">
          {title}
        </h1>
        <p className="text-gray-500 px-4 text-xs">
          {subtitle}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* SEARCH */}
        <div className="flex items-center bg-gray-100 border px-3 py-1 rounded-lg">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="outline-none ml-2 text-sm bg-transparent w-40"
          />
        </div>

        {/* NOTIFICATION */}
        <div className="relative">

          <button onClick={() => setOpen(!open)}>
            <FiBell size={18} />
          </button>

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
              {unreadCount}
            </span>
          )}

          {open && (
            <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl border z-50">

              {notifications.length === 0 && (
                <p className="p-4 text-sm text-gray-500">
                  No notifications
                </p>
              )}

              {notifications.map(n => (
                <div
                  key={n._id}
                  onClick={() => handleNotificationClick(n)}
                  className="flex items-start gap-3 p-4 border-b hover:bg-gray-50 cursor-pointer transition"
                >

                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    {n.body?.[0]}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      {n.body}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {!n.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
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