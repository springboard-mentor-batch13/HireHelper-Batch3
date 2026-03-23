export default function RequestCard({ request, onAccept, onReject, loadingId }) {

  const task = request.task_id;
  const user = request.requester_id;

  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 mb-5">

      <div className="flex justify-between">

        {/* LEFT */}
        <div className="flex gap-4">

          {/* Avatar */}
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold">
            {user?.first_name?.[0] || "U"}
          </div>

          <div>

            <h3 className="font-semibold text-lg">
              {user?.first_name} {user?.last_name}
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              {task?.description || "No description"}
            </p>

            <div className="mt-3 text-sm text-gray-600">
              <p className="font-medium">Requesting for:</p>
              <p>{task?.title}</p>
            </div>

            <div className="flex gap-5 text-xs text-gray-500 mt-3">

              <span>
                📅 {task?.start_time
                  ? new Date(task.start_time).toLocaleDateString() + " • " +
                  new Date(task.start_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    }) 
                  : "No date"}
              </span>

              <span>
                📍 {task?.location || "No location"}
              </span>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex gap-3 items-start">

          {request.status === "pending" && (
            <>
              <button
                disabled={loadingId === request._id}
                onClick={() => onAccept(request._id)}
                className="bg-green-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-green-600 disabled:opacity-50"
              >
                {loadingId === request._id ? "Processing..." : "Accept"}
              </button>

              <button
                disabled={loadingId === request._id}
                onClick={() => onReject(request._id)}
                className="text-gray-600 text-sm hover:text-red-500 disabled:opacity-50"
              >
                Decline
              </button>
            </>
          )}

          {request.status === "accepted" && (
            <span className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm">
              accepted
            </span>
          )}

          {request.status === "rejected" && (
            <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm">
              rejected
            </span>
          )}

        </div>

      </div>

    </div>
  );
}