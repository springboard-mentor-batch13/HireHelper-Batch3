import { FiMapPin, FiClock, FiSend } from "react-icons/fi";

export default function TaskCard({
  task,
  showRequest,
  onRequest,
  requestingId,
  isRequested
}) {

  const getTimeAgo = (date) => {
    if (!date) return "No time";
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getStatusColor = () => {
    switch (task.status) {
      case "open":
        return "bg-green-100 text-green-700";
      case "accepted":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border">

      {/* IMAGE */}
      <div className="h-44 w-full">
        {task.picture ? (
          <img
            src={task.picture}
            alt="task"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
            {task.title}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">

        {/* TITLE + STATUS */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
            {task.title}
          </h3>

          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
            {task.status}
          </span>
        </div>

        {/* DESC */}
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {task.description || "No description"}
        </p>

        {/* LOCATION */}
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <FiMapPin className="mr-1" />
          {task.location || "No location"}
        </div>

        {/* TIME */}
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <FiClock className="mr-1" />
          {getTimeAgo(task.createdAt)}
        </div>

        {/* BUTTON */}
        {showRequest && (
          <button
            disabled={requestingId === task._id || isRequested || task.status !== "open"}
            onClick={() => onRequest(task._id)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition disabled:opacity-50"
          >
            <FiSend size={14} />
            {isRequested
              ? "Requested"
              : requestingId === task._id
              ? "Sending..."
              : task.status !== "open"
              ? "Closed"
              : "Send Request"}
          </button>
        )}

      </div>
    </div>
  );
}