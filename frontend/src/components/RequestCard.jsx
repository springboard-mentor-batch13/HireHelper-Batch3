import { FaUser, FaCheck, FaTimes } from "react-icons/fa";

export default function RequestCard({ request, onAccept, onReject, loadingId }) {

  const task = request.task_id;
  const user = request.requester_id;

  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 mb-5 hover:shadow-md transition">

      <div className="flex justify-between items-start">

        {/* LEFT */}
        <div className="flex gap-4">

          {/* Avatar */}
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <FaUser className="text-white text-sm" />
          </div>

          <div>

            <h3 className="font-semibold text-lg text-gray-900">
              {user?.first_name} {user?.last_name}
            </h3>

            <p className="text-sm text-gray-600">
              For: <span className="text-blue-500">{task?.title}</span>
            </p>

            {/* Description */}
            <div className="bg-gray-50 rounded-lg p-3 mt-3">
              <p className="text-sm text-gray-700">
                {task?.description || "Interested in helping with this task."}
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end gap-3">

          {/* Status */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              request.status === "accepted"
                ? "bg-green-100 text-green-700"
                : request.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {request.status}
          </span>

          {/* Buttons */}
          {request.status === "pending" && (
            <div className="flex gap-2">

              <button
                disabled={loadingId === request._id}
                onClick={() => onAccept(request._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 flex items-center gap-1 disabled:opacity-50"
              >
                <FaCheck size={12} />
                {loadingId === request._id ? "..." : "Accept"}
              </button>

              <button
                disabled={loadingId === request._id}
                onClick={() => onReject(request._id)}
                className="bg-red-50 text-red-500 px-3 py-1 rounded-lg text-sm hover:bg-red-100 flex items-center gap-1 disabled:opacity-50"
              >
                <FaTimes size={12} />
                Reject
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}