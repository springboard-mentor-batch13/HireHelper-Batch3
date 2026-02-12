import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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
    alert("Account Created Successfully!");
  };

  return (
    <div className="min-h-screen bg-[#dcefe6] flex items-center justify-center font-sans ">
      <div className="w-[430px] bg-white p-9 rounded-xl shadow-lg text-center mt-5">

        <div className="w-[55px] h-[55px] bg-[#27ae60] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">
          👤
        </div>

        <h2 className="text-xl font-semibold">Create Account</h2>
        <p className="text-sm text-gray-500 mb-6">
          Join Hire a Helper community
        </p>

        <form onSubmit={handleSubmit} className="text-left space-y-4">

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm mb-1 font-medium">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm mb-1 font-medium">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">
              Phone Number (Optional)
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#2f80ed] text-white rounded-md mt-2 hover:bg-[#1c60c9] transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm mt-5">
          Already have an account?{" "}
          <span className="text-[#2f80ed] cursor-pointer font-medium">
            <Link to="/login">
              Sign In
            </Link>
          </span>
        </p>

      </div>
    </div>
  );
}
