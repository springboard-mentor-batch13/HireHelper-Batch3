import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    alert("Login Successful!");
  };

  return (
    <div className="min-h-screen bg-[#dcefe6] flex justify-center pt-20">
      
      <div className="w-[430px] bg-white p-8 rounded-xl shadow-lg text-center">

        {/* Icon */}
        <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">
          🔐
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-6">
          Sign in to your account
        </p>

        {/* Form */}
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
            <Link to="/register">
            Register
            </Link>
          </span>
        </p>

      </div>
    </div>
  );
}
