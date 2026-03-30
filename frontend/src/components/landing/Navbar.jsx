import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
          <Link to="/">HireHelper</Link>
        </h1>

        {/* Middle Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/explore" className="hover:text-blue-600 transition">
            Explore
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition">
            About
          </Link>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition"
          >
            Sign Up
          </Link>

        </div>

      </div>

    </nav>
  );
}