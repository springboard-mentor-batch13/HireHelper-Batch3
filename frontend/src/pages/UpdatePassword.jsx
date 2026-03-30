// UpdatePassword.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function UpdatePassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/auth/reset-password", {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        token: token,
      });

      toast.success("Password Updated!");
      navigate("/login");

    } catch (error) {
      toast.error("Error updating password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4 text-center">
          Set New Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            name="password"
            placeholder="New Password"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded-md">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}