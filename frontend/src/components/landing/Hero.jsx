import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

export default function Hero({ onNavigate }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">

      {/* Background Blur */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-8">

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Find Trusted Helpers for Your{" "}
              <span className="text-blue-500">Everyday Tasks</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600">
              Post tasks and connect with skilled helpers near you quickly and securely.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">

              <button
                onClick={() => onNavigate("dashboard")}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition flex items-center gap-2"
              >
                Get Started <FaArrowRight />
              </button>

              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition">
                Explore Tasks
              </button>

            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span className="text-gray-700 font-semibold">
                  10K+ Tasks Completed
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span className="text-gray-700 font-semibold">
                  5K+ Users
                </span>
              </div>

            </div>

          </div>

          {/* RIGHT CARD */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 hover:scale-105 transition duration-300">

            <div className="space-y-4">

              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Garden Maintenance</h3>
                  <p className="text-sm text-gray-600">Due in 2 hours</p>
                </div>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Active
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">House Cleaning</h3>
                  <p className="text-sm text-gray-600">3 requests</p>
                </div>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  Pending
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-900">Furniture Assembly</h3>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <span className="bg-gray-400 text-white px-3 py-1 rounded-full text-sm">
                  Done
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}