
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] transition-colors duration-300 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand & Social */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-bold text-xl">
                O
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white">Obito<span className="text-gray-500">Store</span></span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              Crafting premium digital experiences for the modern lifestyle. Quality, comfort, and style in every thread.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6">Shop</h3>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/men" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Men's Collection</Link></li>
              <li><Link to="/women" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Women's Collection</Link></li>
              <li><Link to="/kids" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Kids' Collection</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6">Company</h3>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Our Story</Link></li>
              <li><Link to="/careers" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Careers</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6">Stay Updated</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white"
              />
              <button className="px-4 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-90 transition">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 ObitoStore. All rights reserved.
          </p>

          <div className="flex gap-4 text-gray-400 dark:text-gray-600 text-2xl">
            <FaCcVisa className="hover:text-gray-600 dark:hover:text-gray-300 transition" />
            <FaCcMastercard className="hover:text-gray-600 dark:hover:text-gray-300 transition" />
            <FaCcPaypal className="hover:text-gray-600 dark:hover:text-gray-300 transition" />
            <FaApplePay className="hover:text-gray-600 dark:hover:text-gray-300 transition" />
          </div>
        </div>

      </div>

      {/* System Status Indicator */}
      <div className="max-w-7xl mx-auto px-6 mt-4 flex justify-end">
        <SystemStatus />
      </div>
    </footer>
  );
}

function SystemStatus() {
  const [status, setStatus] = React.useState('checking');

  React.useEffect(() => {
    import('../api').then(({ checkBackendHealth }) => {
      checkBackendHealth().then(isOnline => {
        setStatus(isOnline ? 'online' : 'offline');
      });
    });
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs font-mono">
      <span className="text-gray-500 dark:text-gray-400">System Status:</span>
      {status === 'checking' && <span className="text-yellow-500">● Checking...</span>}
      {status === 'online' && <span className="text-green-500">● Online (MySQL Connected)</span>}
      {status === 'offline' && <span className="text-red-500">● Offline (Using Fallback Data)</span>}
    </div>
  );
}

export default Footer;
