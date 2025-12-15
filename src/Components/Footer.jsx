import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white text-gray-600 border-t">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Obito Clothing Brand
          </h2>
          <p className="mt-4 text-sm text-gray-500">
            Building modern digital products with performance, design, and
            scalability in mind.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <a
              href="#"
              className="p-3 bg-white border rounded-full text-gray-600 shadow-sm
              hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="p-3 bg-white border rounded-full text-gray-600 shadow-sm
              hover:bg-pink-600 hover:text-white hover:border-pink-600 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="p-3 bg-white border rounded-full text-gray-600 shadow-sm
              hover:bg-sky-500 hover:text-white hover:border-sky-500 transition"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="p-3 bg-white border rounded-full text-gray-600 shadow-sm
              hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              className="p-3 bg-white border rounded-full text-gray-600 shadow-sm
              hover:bg-red-600 hover:text-white hover:border-red-600 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-indigo-600 transition">About Us</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Careers</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Press</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Blog</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-indigo-600 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Subscribe</h3>
          <p className="text-sm text-gray-500 mb-4">
            Get product updates and insights directly to your inbox.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-lg bg-white border border-gray-300 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              className="px-5 py-2 bg-indigo-600 text-white rounded-r-lg
              hover:bg-black-500 transition"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 Obito Clothing Brand. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-600 transition">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
