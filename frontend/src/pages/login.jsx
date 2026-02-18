import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email_id: formData.email,
          password: formData.password,
        }
      );

      // Save token
      localStorage.setItem("token", response.data.token);

      toast.success("Login Successful!");

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#dcefe6] flex justify-center pt-4">
      <div className="w-[430px] h-[500px] bg-white p-8 rounded-xl shadow-lg text-center">

        <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">
          🔐
        </div>

        <h2 className="text-2xl font-semibold">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-6">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="text-left space-y-4">

          <div>
            <label className="block text-sm mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm mt-5">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer font-medium">
            <Link to="/register">Register</Link>
          </span>
        </p>

      </div>
    </div>
  );
}
