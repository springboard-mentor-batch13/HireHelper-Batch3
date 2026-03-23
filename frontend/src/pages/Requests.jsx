import { useEffect, useState } from "react";
import api from "../services/api";
import RequestCard from "../components/RequestCard";

export default function Requests() {

  const [requests, setRequests] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await api.get("/requests/received");
      setRequests(res.data.requests);

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async (id) => {
    try {
      setLoadingId(id);

      await api.put(`/requests/accept/${id}`);

      fetchRequests();

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to accept request");
    } finally {
      setLoadingId(null);
    }
  };

  const rejectRequest = async (id) => {
    try {
      setLoadingId(id);

      await api.put(`/requests/reject/${id}`);

      fetchRequests();

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to reject request");
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Incoming Requests</h1>
        <p className="text-gray-500 text-sm">
          People who want to help with your tasks
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-gray-500">Loading...</p>
      )}

      {/* Empty State */}
      {!loading && requests.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No incoming requests yet 🚀
        </p>
      )}

      {/* Requests List */}
      {!loading &&
        requests.map((r) => (
          <RequestCard
            key={r._id}
            request={r}
            onAccept={acceptRequest}
            onReject={rejectRequest}
            loadingId={loadingId}
          />
        ))}

    </div>
  );
}