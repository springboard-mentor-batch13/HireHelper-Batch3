import { useState } from "react";
import api from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import OTPInput from "react-otp-input";

export default function ChangePasswordOTP() {

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleVerify = async () => {

    if (!email) {
      toast.error("Session expired. Start again.");
      return navigate("/change-password/email");
    }

    if (otp.length !== 6) {
      toast.error("Enter 6 digit OTP");
      return;
    }

    try {
      setLoading(true);

      await api.post("/user/verify-change-password-otp", {
        otp
      });

      toast.success("OTP Verified");

      navigate("/change-password/new", {
        state: { email }
      });

    } catch (error) {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {

    if (resending) return;

    try {
      setResending(true);
      toast.info("Sending OTP...");

      await api.post("/user/send-change-password-otp", {
        email_id: email
      });

      toast.success("OTP resent");

    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#dcefe6] flex items-center justify-center">

      <div className="w-[420px] bg-white p-8 rounded-xl shadow-lg text-center">

        {/* ICON */}
        <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">
          🔐
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-semibold">
          Verify OTP
        </h2>

        {/* SUBTEXT */}
        <p className="text-sm text-gray-500 mb-6">
          Enter the 6-digit OTP sent to <br />
          <span className="font-medium">{email}</span>
        </p>

        {/* OTP INPUT */}
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          containerStyle={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
          renderInput={(props) => (
            <input
              {...props}
              className="w-12 h-12 text-xl text-center border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          )}
        />

        {/* BUTTON */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition active:scale-95 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* RESEND */}
        <p className="text-sm text-gray-500 mt-4">
          Didn't get OTP?{" "}
          <button
            onClick={handleResend}
            className="text-blue-600 font-semibold hover:underline"
          >
            {resending ? "Sending..." : "Resend"}
          </button>
        </p>

      </div>
    </div>
  );
}