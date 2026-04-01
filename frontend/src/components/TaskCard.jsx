import { useState } from "react";
import { FiMapPin, FiClock, FiEdit, FiTrash, FiSend } from "react-icons/fi";
import API from "../services/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function TaskCard({
  task,
  showRequest,
  onRequest,
  requestingId,
  isRequested,
  isOwner,
  onDelete,
  onUpdate
}) {

  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [form, setForm] = useState({
    ...task,
    start_time: task.start_time || "",
    end_time: task.end_time || "",
    file: null
  });

  // ✅ format datetime-local
  const formatDateTime = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().slice(0, 16);
  };

  // 🔥 EXPIRED LOGIC
  const isExpired =
    task.end_time && new Date() > new Date(task.end_time);

  const status = isExpired ? "expired" : task.status;

  // 🔥 TIME DISPLAY FIX
  const time = task.start_time
    ? `${dayjs(task.start_time).format("DD MMM, hh:mm A")} • ${dayjs(task.start_time).fromNow()}`
    : `${dayjs(task.createdAt).fromNow()}`;

  // 🎨 STATUS COLOR
  const getStatusColor = () => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-700";
      case "accepted":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-gray-200 text-gray-700";
      case "expired":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // ✅ UPDATE
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      if (form.title) formData.append("title", form.title);
      if (form.description) formData.append("description", form.description);
      if (form.location) formData.append("location", form.location);
      if (form.start_time) formData.append("start_time", form.start_time);
      if (form.end_time) formData.append("end_time", form.end_time);

      if (form.file) {
        formData.append("picture", form.file);
      }

      const res = await API.put(`/tasks/${task._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUpdate(res.data.task);
      toast.success("Task updated ✨");
      setShowModal(false);

    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  // ❌ DELETE
  const handleDelete = async () => {
    try {
      await API.delete(`/tasks/${task._id}`);
      onDelete(task._id);
      toast.success("Task deleted 🗑️");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      {/* CARD */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 sm:p-6 border border-gray-100">

        {/* IMAGE */}
        <div className="h-32 sm:h-44 w-full rounded-lg overflow-hidden mb-3 sm:mb-4">
          {task.picture ? (
            <img src={task.picture} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-center px-2">
              {task.title}
            </div>
          )}
        </div>

        {/* TITLE + STATUS + REQUEST COUNT */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
          <h3 className="font-semibold text-base sm:text-lg text-gray-900 line-clamp-1 flex-1">
            {task.title}
          </h3>

          <div className="flex gap-2 items-center flex-shrink-0">
            {/* 🔔 REQUEST COUNT */}
            {task.requestCount > 0 && (
  <div className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-orange-50 border border-orange-200">

    {/* dot */}
    <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>

    {/* text */}
    <span className="text-[10px] sm:text-[11px] font-semibold text-orange-700 whitespace-nowrap">
      {task.requestCount} {task.requestCount === 1 ? "Request" : "Requests"}
    </span>

  </div>
)}

            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()} whitespace-nowrap`}>
              {status}
            </span>
          </div>
        </div>

        {/* DESC */}
        <p className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-2">
          {task.description || "No description"}
        </p>

        {/* LOCATION */}
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-1 overflow-hidden">
          <FiMapPin className="mr-1 flex-shrink-0" />
          <span className="truncate">{task.location || "No location"}</span>
        </div>

        {/* TIME */}
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3 overflow-hidden">
          <FiClock className="mr-1 flex-shrink-0" />
          <span className="truncate">{time}</span>
        </div>

        {/* 🔥 FEED BUTTON */}
        {showRequest && (
          <button
            disabled={
              requestingId === task._id ||
              isRequested ||
              status !== "open"
            }
            onClick={() => onRequest(task._id)}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            <FiSend size={14} />
            <span className="truncate">
              {isRequested
                ? "Requested"
                : requestingId === task._id
                ? "Sending..."
                : status !== "open"
                ? "Closed"
                : "Send Request"}
            </span>
          </button>
        )}

        {/* OWNER BUTTONS */}
        {isOwner && (
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">

            <button
              onClick={() => setShowModal(true)}
              className="border border-indigo-500 text-indigo-500 px-3 py-2 rounded-lg text-sm hover:bg-indigo-50 flex items-center justify-center gap-1 order-2 sm:order-1"
            >
              <FiEdit size={14} /> Edit
            </button>

            <button
              onClick={() => setConfirmDelete(true)}
              className="bg-red-50 text-red-500 px-3 py-2 rounded-lg text-sm hover:bg-red-100 flex items-center justify-center gap-1 order-1 sm:order-2"
            >
              <FiTrash size={14} /> Delete
            </button>

          </div>
        )}
      </div>

      {/* 🔥 EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-xl shadow-lg max-h-[90vh] overflow-y-auto">

            <h2 className="text-lg font-semibold mb-4">Edit Task</h2>

            {/* IMAGE */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              {form.picture && (
                <img src={form.picture} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
              )}
              <label className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm cursor-pointer hover:bg-blue-700 w-full sm:w-auto text-center">
                Change Image
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setForm({
                      ...form,
                      picture: URL.createObjectURL(e.target.files[0]),
                      file: e.target.files[0],
                    })
                  }
                />
              </label>
            </div>

            {/* INPUTS */}
            <input
              className="w-full border border-gray-200 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
            />

            <textarea
              className="w-full border border-gray-200 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Description"
              rows="3"
            />

            <input
              className="w-full border border-gray-200 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Location"
            />

            {/* TIME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">

              <input
                type="datetime-local"
                className="border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                value={formatDateTime(form.start_time)}
                onChange={(e) =>
                  setForm({ ...form, start_time: e.target.value })
                }
              />

              <input
                type="datetime-local"
                className="border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                value={formatDateTime(form.end_time)}
                onChange={(e) =>
                  setForm({ ...form, end_time: e.target.value })
                }
              />

            </div>

            {/* FOOTER */}
            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 sm:gap-0">

              <button
                onClick={() => setConfirmDelete(true)}
                className="text-red-500 text-sm hover:text-red-600 w-full sm:w-auto"
              >
                Delete Task
              </button>

              <div className="flex gap-3 w-full sm:w-auto">
                <button onClick={() => setShowModal(false)} className="flex-1 sm:flex-none px-4 py-2 border rounded-lg hover:bg-gray-50">
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="flex-1 sm:flex-none bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

          <div className="bg-white p-6 rounded-xl text-center w-full max-w-sm">

            <h3 className="font-semibold mb-2 text-lg">
              Delete permanently?
            </h3>

            <p className="text-gray-500 mb-4 text-sm">
              Do you want to delete this task permanently?
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="border px-4 py-2 rounded-lg hover:bg-gray-50 order-2 sm:order-1"
              >
                No
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 order-1 sm:order-2"
              >
                Yes, Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}