import { useEffect, useState } from "react";
import api from "../services/api";
import MyRequestCard from "../components/MyRequestCard";

export default function MyRequests(){

  const [requests,setRequests] = useState([]);

  const fetchRequests = async ()=>{
    try {
      const res = await api.get("/requests/myRequests");
      setRequests(res.data.requests);
    } catch (error) {
      console.error(error);
      alert("Failed to load requests");
    }
  }

  useEffect(()=>{
    fetchRequests();
  },[])

  return (

    <div className="p-8">

      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          My Requests
        </h1>

        <p className="text-gray-500 text-sm">
          Track the help requests you've sent
        </p>
      </div>

      {requests.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          You haven't sent any requests yet 🚀
        </p>
      )}

      {requests.map(r=>(
        <MyRequestCard
          key={r._id}
          request={r}
        />
      ))}

    </div>

  )
}