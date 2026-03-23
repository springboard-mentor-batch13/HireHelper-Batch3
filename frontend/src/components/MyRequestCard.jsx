export default function MyRequestCard({ request }) {

  const task = request.task_id;

  return (

    <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">

      {/* Top */}
      <div className="flex justify-between items-center mb-3">

        <div>
          <h3 className="text-lg font-semibold">
            {task?.title || "Untitled Task"}
          </h3>

          <p className="text-sm text-gray-500">
            Task owner
          </p>
        </div>

        <span className={`px-4 py-1 rounded-full text-sm
          ${request.status === "pending"
            ? "bg-yellow-200 text-yellow-800"
            : request.status === "accepted"
            ? "bg-green-200 text-green-700"
            : "bg-red-200 text-red-700"
          }`}>
          {request.status}
        </span>

      </div>

      {/* Description */}
      <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-600 mb-4">
        {task?.description || "No description"}
      </div>

      {/* Time + Location */}
      <div className="flex gap-6 text-sm text-gray-500 mb-4">

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

      {/* Image */}
      {task?.picture && (
        <div className="w-40 overflow-hidden rounded-lg mt-3">
          <img
            src={task.picture}
            alt="task"
            className="w-full h-full object-cover"
          />
        </div>
      )}

    </div>

  );
}