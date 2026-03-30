import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ChangePasswordEmail() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOTP = async () => {

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      await api.post("/user/send-change-password-otp", {
        email_id: email
      });

      toast.success("OTP sent to your email");

      navigate("/change-password/otp", {
        state: { email }
      });

    } catch (err) {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#dcefe6] flex items-center justify-center">

      <div className="w-[420px] bg-white p-8 rounded-xl shadow-lg text-center">

        {/* ICON */}
        <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">
          📧
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-semibold">
          Enter Your Email
        </h2>

        {/* SUBTEXT */}
        <p className="text-sm text-gray-500 mb-6">
          We'll send a verification OTP to your email
        </p>

        {/* INPUT */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* BUTTON */}
        <button
          onClick={handleSendOTP}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition active:scale-95 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

      </div>
    </div>
  );
}