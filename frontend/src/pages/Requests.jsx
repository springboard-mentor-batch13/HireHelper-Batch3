import { useEffect, useState } from "react";
import api from "../services/api";
import RequestCard from "../components/RequestCard";
import { toast } from "react-toastify";

export default function Requests() {

  const [requests, setRequests] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/requests/received");
      setRequests(res.data.requests);
    } catch {
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ACCEPT
  const acceptRequest = async (id, taskId) => {
    try {
      setLoadingId(id);

      await api.put(`/requests/accept/${id}`);

      setRequests((prev) =>
        prev.map((r) =>
          String(r.task_id?._id) === String(taskId)
            ? {
                ...r,
                status: r._id === id ? "accepted" : "rejected",
                task_id: {
                  ...r.task_id,
                  status: r._id === id ? "accepted" : r.task_id.status,
                },
              }
            : r
        )
      );

      toast.success("Request Accepted ");

      // 🔄 AUTO REFRESH
      setTimeout(() => fetchRequests(), 500);

    } catch {
      toast.error("Failed to accept");
    } finally {
      setLoadingId(null);
    }
  };

  // ❌ REJECT
  const rejectRequest = async (id) => {
    try {
      setLoadingId(id);

      await api.put(`/requests/reject/${id}`);

      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: "rejected" } : r
        )
      );

      toast.success("Request Rejected");

      // 🔄 AUTO REFRESH
      setTimeout(() => fetchRequests(), 500);

    } catch {
      toast.error("Failed to reject");
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ COMPLETE
  const markCompleted = async (taskId) => {
    try {
      setLoadingId(taskId);

      await api.put(`/tasks/complete/${taskId}`);

      setRequests((prev) =>
        prev.map((r) =>
          String(r.task_id?._id) === String(taskId)
            ? {
                ...r,
                task_id: {
                  ...r.task_id,
                  status: "completed",
                },
              }
            : r
        )
      );

      toast.success("Task Completed 🎉");

      // 🔄 AUTO REFRESH
      setTimeout(() => fetchRequests(), 500);

    } catch {
      toast.error("Failed to complete");
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">

      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Requests</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Review and manage incoming requests
        </p>
      </div>

      {loading && <p className="text-center mt-10 text-gray-500 animate-pulse">Loading...</p>}

      {!loading && requests.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No requests yet 🚀
        </p>
      )}

      <div className="space-y-4 sm:space-y-5">
        {!loading &&
          requests.map((r) => (
            <RequestCard
              key={r._id}
              request={r}
              onAccept={acceptRequest}
              onReject={rejectRequest}
              onComplete={markCompleted}
              loadingId={loadingId}
            />
          ))}
      </div>

    </div>
  );
}