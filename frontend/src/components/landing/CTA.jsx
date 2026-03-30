import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CTA({ onNavigate }) {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-500 to-blue-600">

      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Start Hiring Today
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Join thousands of users who trust HireHelper for their everyday tasks
        </p>

        {/* Button */}
        <Link to='/register'>
        <button
          onClick={() => onNavigate("dashboard")}
          className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-gray-100 hover:shadow-2xl transition-all flex items-center justify-center gap-2 mx-auto"
        >
          Get Started <FaArrowRight />
        </button>       
        </Link>

      </div>

    </section>
  );
}