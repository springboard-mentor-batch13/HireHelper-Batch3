import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">

      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Logo */}
          <div>
            <h3 className="text-2xl font-bold text-blue-500 mb-4">
              HireHelper
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted platform for everyday tasks. Find helpers easily and get things done faster.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition">
                <FaFacebookF />
              </a>

              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition">
                <FaTwitter />
              </a>

              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition">
                <FaInstagram />
              </a>

              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition">
                <FaLinkedinIn />
              </a>
            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          © 2026 HireHelper. All rights reserved.
        </div>

      </div>

    </footer>
  );
}