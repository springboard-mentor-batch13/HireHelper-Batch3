import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      alert("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email_id: formData.email,
          phone_number: formData.phone,
          password: formData.password,
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        navigate("/verify", { state: { email: formData.email } });
      } else {
        alert(response.data.message);
      }

    } catch (error) {
      alert(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#dcefe6] flex items-center justify-center font-sans">
      <div className="w-[430px] bg-white p-9 rounded-xl shadow-lg text-center">

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
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm mb-1 font-medium">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#2f80ed] text-white rounded-md mt-2 hover:bg-[#1c60c9] transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm mt-5">
          Already have an account?{" "}
          <span className="text-[#2f80ed] font-medium">
            <Link to="/login">Sign In</Link>
          </span>
        </p>

      </div>
    </div>
  );
}
