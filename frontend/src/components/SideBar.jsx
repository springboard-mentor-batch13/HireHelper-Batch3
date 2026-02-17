import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-[#0f172a] text-white h-screen fixed left-0 top-0 p-6">
      
      <h1 className="text-2xl font-bold mb-10">HireHelper</h1>

      <nav className="space-y-5 text-sm">

        <Link
          to="/dashboard"
          className="block hover:text-blue-400 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/profile"
          className="block hover:text-blue-400 transition"
        >
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="block text-left w-full hover:text-red-400 transition"
        >
          Logout
        </button>

      </nav>
    </div>
  );
}
