import { FaUser } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function RequestCard({
  request,
  onAccept,
  onReject,
  onComplete,
  loadingId
}) {

  const task = request.task_id;
  const user = request.requester_id;

  const isLoadingRequest = loadingId === request._id;
  const isLoadingTask = loadingId === task?._id;

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-4 sm:p-6">

      {/* TOP */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">

        {/* LEFT */}
        <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">

          {/* 🔥 AVATAR (UPDATED) */}
          {user?.profile_picture ? (
            <img
              src={user.profile_picture}
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
              {user?.first_name} {user?.last_name}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
              Requesting:{" "}
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

        {/* STATUS */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${
            request.status === "accepted"
              ? "bg-green-100 text-green-700"
              : request.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : request.status === "rejected"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {request.status}
        </span>
      </div>

      {/* MESSAGE */}
      <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mt-4">
        <p className="text-gray-700 text-xs sm:text-sm break-words">
          {task?.description || "No description"}
        </p>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-5">

        {/* 🟡 PENDING */}
        {request.status === "pending" && (
          <>
            <button
              disabled={isLoadingRequest}
              onClick={() => onReject(request._id)}
              className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-200 disabled:opacity-50 transition order-2 sm:order-1"
            >
              {isLoadingRequest ? "..." : "Reject"}
            </button>

            <button
              disabled={isLoadingRequest}
              onClick={() => onAccept(request._id, task?._id)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50 transition order-1 sm:order-2"
            >
              {isLoadingRequest ? "..." : "Accept"}
            </button>
          </>
        )}

        {/* 🟢 ACCEPTED → SHOW COMPLETE */}
        {request.status === "accepted" && task?.status !== "completed" && (
          <button
            disabled={isLoadingTask}
            onClick={() => onComplete(task?._id)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 disabled:opacity-50 transition w-full sm:w-auto"
          >
            {isLoadingTask ? "..." : "Mark Completed"}
          </button>
        )}

        {/* ✅ COMPLETED */}
        {task?.status === "completed" && (
          <span className="text-green-600 font-medium text-sm text-center sm:text-left">
            Task Completed
          </span>
        )}

      </div>
    </div>
  );
}