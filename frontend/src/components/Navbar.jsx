import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
      
      <h1 className="text-lg font-semibold text-[#2f80ed]">
        HireHelper
      </h1>

      <div className="space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 border border-[#2f80ed] text-[#2f80ed] rounded-md hover:bg-[#2f80ed] hover:text-white transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-4 py-2 bg-[#2f80ed] text-white rounded-md hover:bg-[#1c60c9] transition"
        >
          Sign Up
        </Link>
      </div>

    </nav>
  );
}
