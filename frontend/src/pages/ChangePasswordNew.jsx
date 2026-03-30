import { useState } from "react";
import api from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function ChangePasswordNew() {

  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleUpdate = async () => {

    if (!email) {
      toast.error("Session expired");
      return navigate("/change-password/email");
    }

    if (!pass || !confirm) {
      toast.error("All fields are required");
      return;
    }

    if (pass !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.put("/user/update-password", {
        newPassword: pass
      });

      toast.success("Password updated successfully!");

      navigate("/dashboard/settings");

    } catch (err) {
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#dcefe6] flex items-center justify-center">

      <div className="w-[420px] bg-white p-8 rounded-xl shadow-lg text-center">

        {/* ICON */}
        <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">
          🔑
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-semibold">
          Set New Password
        </h2>

        {/* SUBTEXT */}
        <p className="text-sm text-gray-500 mb-6">
          Create a strong password for your account
        </p>

        {/* INPUTS */}
        <input
          type="password"
          placeholder="New Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition active:scale-95 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </div>
    </div>
  );
}