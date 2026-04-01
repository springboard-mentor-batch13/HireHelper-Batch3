import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function MyRequests() {

  const [requests, setRequests] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/requests/myRequests");
      setRequests(res.data.requests);
    } catch {
      toast.error("Failed to load requests");
    }
  };

  const cancelRequest = async (id) => {
    try {
      setLoadingId(id);

      await api.delete(`/requests/cancel/${id}`);

      setRequests((prev) => prev.filter((r) => r._id !== id));

      toast.success("Request Cancelled");

      // 🔄 AUTO REFRESH  
      setTimeout(() => fetchRequests(), 500);

    } catch {
      toast.error("Cancel failed");
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          My Requests
        </h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Track your requests
        </p>
      </div>

      {/* EMPTY */}
      {requests.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No requests yet 🚀
        </p>
      )}

      {/* LIST */}
      <div className="space-y-4 sm:space-y-5">

        {requests.map((request) => {
          const task = request.task_id;
          const owner = task?.createdBy;

          // 🔥 FINAL STATUS LOGIC
          const finalStatus =
            task?.status === "completed"
              ? "completed"
              : request.status;

          return (
            <div
              key={request._id}
              className="bg-white rounded-lg sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-4 sm:p-6"
            >

              {/* TOP */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">

                <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">

                  {/* AVATAR */}
                  {owner?.profile_picture ? (
                    <img
                      src={owner.profile_picture}
                      alt="user"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaUser className="text-white text-xs sm:text-sm" />
                    </div>
                  )}

                  {/* INFO */}
                  <div className="flex-1 min-w-0">

                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 truncate">
                      {owner?.first_name} {owner?.last_name}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
                      Task:{" "}
                      <span className="font-medium text-gray-900">
                        {task?.title}
                      </span>
                    </p>

                    <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1 gap-1">
                      <FiClock className="flex-shrink-0" size={14} />
                      <span className="truncate">
                        {dayjs(request.createdAt).format("hh:mm A")} •{" "}
                        {dayjs(request.createdAt).fromNow()}
                      </span>
                    </div>

                  </div>
                </div>

                {/* 🔥 STATUS FIX */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${
                    finalStatus === "completed"
                      ? "bg-green-200 text-green-800"
                      : finalStatus === "accepted"
                      ? "bg-green-100 text-green-700"
                      : finalStatus === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : finalStatus === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {finalStatus}
                </span>
              </div>

              {/* DESCRIPTION */}
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mt-4">
                <p className="text-gray-700 text-xs sm:text-sm break-words">
                  {task?.description}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-5">

                {/* PENDING */}
                {finalStatus === "pending" && (
                  <button
                    disabled={loadingId === request._id}
                    onClick={() => cancelRequest(request._id)}
                    className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-200 disabled:opacity-50 transition w-full sm:w-auto"
                  >
                    {loadingId === request._id ? "..." : "Cancel Request"}
                  </button>
                )}

                {/* ACCEPTED */}
                {finalStatus === "accepted" && (
                  <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition w-full sm:w-auto"
                  >
                    Chat
                  </button>
                )}

                {/* ✅ COMPLETED */}
                {finalStatus === "completed" && (
                  <span className="text-green-600 font-medium text-sm text-center sm:text-left">
                    Task Completed
                  </span>
                )}

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}