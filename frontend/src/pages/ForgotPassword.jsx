import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Enter email");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/forgot-password", {
        email: email,
      });

      setEmailSent(true);
      toast.success("Reset link sent to email");

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">

        {/* Icon */}
        <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">
          🔑
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-2">
          {!emailSent ? "Reset your Password" : "Check Your Email"}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-6">
          {!emailSent
            ? "Enter your email and we'll send you instructions to reset your password."
            : `We have sent a reset link to ${email}`}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {!emailSent && (
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading
              ? "Please wait..."
              : !emailSent
              ? "Send Reset Link"
              : "Resend Email"}
          </button>

        </form>

        {/* Back to Login */}
        <div className="mt-6">
          <Link
            to="/login"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Login
          </Link>
        </div>

      </div>

    </div>
  );
}