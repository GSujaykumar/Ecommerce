import React, { useState, useEffect, useContext, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { getAllCategories } from "../api";
import { FiShoppingCart, FiHeart, FiUser, FiSearch, FiMenu, FiX, FiMic, FiLogOut, FiMoon, FiSun } from "react-icons/fi";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories().then(setCategories).catch(() => setCategories([]));
  }, []);
  return categories;
};

const useScrollState = (threshold = 24) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
};

function Header() {
  const [darkMode, setDarkMode] = useState(() => typeof document !== "undefined" && document.documentElement.classList.contains("dark"));
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Instant Search State
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const categories = useCategories();
  const scrolled = useScrollState();
  const { cartItems, favoriteItems, setIsCartOpen, user, logout } = useContext(ShopContext);

  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const favCount = favoriteItems?.length ?? 0;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Debounced Instant Search
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      setIsSearching(true);
      setShowDropdown(true);
      const delayFn = setTimeout(() => {
        fetch(`http://localhost:8080/api/products/search?q=${encodeURIComponent(searchQuery.trim())}`)
          .then((res) => res.json())
          .then((data) => {
            setSearchResults(data);
            setIsSearching(false);
          })
          .catch(() => setIsSearching(false));
      }, 300);
      return () => clearTimeout(delayFn);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  const handleVoiceSearch = useCallback(() => {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) {
      alert("Voice search is not supported. Use Chrome or Edge.");
      return;
    }
    const recognition = new Speech();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (e) => {
      const q = e.results[0][0].transcript;
      setSearchQuery(q);
      navigate(`/search?q=${encodeURIComponent(q)}`);
    };
    recognition.start();
  }, [navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropdown(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 capitalize ${isActive ? "text-violet-600 dark:text-violet-400" : "text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400"}`;

  const navBg = scrolled
    ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-sm border-b border-gray-200/60 dark:border-gray-800/60"
    : "bg-white/80 dark:bg-gray-900/80 border-b border-transparent";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300 ${navBg}`}>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="shrink-0">
            <NavLink to="/" className="flex items-center gap-2.5 rounded-lg outline-none focus:ring-2 focus:ring-violet-500/50">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm shadow-md">
                O
              </div>
              <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                OBITO<span className="text-violet-600 dark:text-violet-400">STORE</span>
              </span>
            </NavLink>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            {categories.map((cat) => (
              <NavLink key={cat} to={`/category/${cat}`} className={linkClass}>
                {cat.toLowerCase() === 'home' ? 'Home & Living' : cat}
              </NavLink>
            ))}
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/orders" className={linkClass}>Orders</NavLink>
          </div>

          {/* Right: search + actions */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-2">
            <form onSubmit={handleSearch} className="hidden xl:block max-w-sm flex-1 relative z-50">
              <div className={`flex items-center rounded-xl bg-gray-100 dark:bg-gray-800/80 border transition-all px-3 py-2 ${listening ? "ring-2 ring-violet-500/50 border-violet-500" : "border-transparent focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30"}`}>
                <FiSearch className={`h-4 w-4 shrink-0 transition-all ${isSearching ? "text-violet-600 animate-spin" : "text-gray-400"}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => searchQuery.length > 1 && setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={listening ? "Listening…" : "Search products, categories..."}
                  className="min-w-0 flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white placeholder-gray-500 ml-2"
                />
                <button type="button" onClick={handleVoiceSearch} className={`p-1.5 rounded-lg shrink-0 ${listening ? "text-violet-600 bg-violet-100 dark:bg-violet-900/40" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`} title="Voice search">
                  <FiMic className="h-4 w-4" />
                </button>
              </div>

              {/* Instant Search Dropdown */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden max-h-96 overflow-y-auto animate-fadeIn group">
                  {searchResults.length > 0 ? (
                    <div className="p-2">
                      <p className="px-3 pt-2 pb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Top Results</p>
                      {searchResults.slice(0, 5).map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => { setShowDropdown(false); navigate(`/product/${prod.id}`); }}
                          className="flex items-center gap-4 p-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/80 rounded-xl cursor-pointer transition-colors"
                        >
                          <img src={prod.image || prod.imageUrl} alt="" className="w-12 h-12 object-cover rounded-md border border-gray-100 dark:border-gray-800 bg-white" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{prod.title || prod.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{prod.category}</p>
                          </div>
                        </div>
                      ))}
                      {searchResults.length > 5 && (
                        <button onClick={handleSearch} className="w-full mt-2 py-2 text-center text-xs font-bold text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/30 rounded-lg transition-colors">
                          View all {searchResults.length} results →
                        </button>
                      )}
                    </div>
                  ) : !isSearching && (
                    <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                      No products found for "<span className="text-gray-900 dark:text-white font-medium">{searchQuery}</span>"
                    </div>
                  )}
                </div>
              )}
            </form>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
            <button type="button" onClick={() => setDarkMode((d) => !d)} className="p-2.5 rounded-xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition" aria-label="Toggle theme">
              {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
            <NavLink to="/favorites" className="relative p-2.5 rounded-xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <FiHeart className="h-5 w-5" />
              {favCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-rose-500 text-white text-[10px] font-semibold rounded-full ring-2 ring-white dark:ring-gray-900">
                  {favCount}
                </span>
              )}
            </NavLink>
            <button type="button" onClick={() => setIsCartOpen(true)} className="relative p-2.5 rounded-xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <FiShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-violet-600 text-white text-[10px] font-semibold rounded-full ring-2 ring-white dark:ring-gray-900">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-1.5 ml-2">
              {user ? (
                <button
                  type="button"
                  onClick={() => setProfileOpen((o) => !o)}
                  className="rounded-full p-0.5 ring-2 ring-gray-100 dark:ring-gray-800 hover:ring-violet-500 transition-all outline-none overflow-hidden"
                >
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || "User")}&background=7c3aed&color=fff`}
                    alt="User"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-violet-600 hover:text-white transition-all shadow-sm"
                  title="Sign in"
                >
                  <FiUser className="h-5 w-5" />
                </NavLink>
              )}
              {user && profileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} aria-hidden />
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 py-2 z-20">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.fullName || "User"}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                    <NavLink to="/orders" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/80">My Orders</NavLink>
                    <NavLink to="/favorites" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/80">Saved Items</NavLink>
                    <NavLink to="/admin" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">⚡ Admin Dashboard</NavLink>
                    <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2">
                      <button type="button" onClick={() => { logout(); setProfileOpen(false); navigate("/"); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20">
                        <FiLogOut className="h-4 w-4" /> Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex lg:hidden">
            <button type="button" onClick={() => setMobileOpen(true)} className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Open menu">
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-hidden />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <span className="font-semibold text-gray-900 dark:text-white">Menu</span>
              <button type="button" onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 space-y-1">
              <NavLink to="/" onClick={() => setMobileOpen(false)} className={({ isActive }) => `block py-3 px-3 rounded-lg text-base font-medium ${isActive ? "text-violet-600 bg-violet-50 dark:bg-violet-900/20" : "text-gray-700 dark:text-gray-300"}`}>Home</NavLink>
              {categories.map((cat) => (
                <NavLink key={cat} to={`/category/${cat}`} onClick={() => setMobileOpen(false)} className={({ isActive }) => `block py-3 px-3 rounded-lg text-base font-medium capitalize ${isActive ? "text-violet-600 bg-violet-50 dark:bg-violet-900/20" : "text-gray-700 dark:text-gray-300"}`}>
                  {cat.toLowerCase() === 'home' ? 'Home & Living' : cat}
                </NavLink>
              ))}
              <NavLink to="/about" onClick={() => setMobileOpen(false)} className={({ isActive }) => `block py-3 px-3 rounded-lg text-base font-medium ${isActive ? "text-violet-600 bg-violet-50 dark:bg-violet-900/20" : "text-gray-700 dark:text-gray-300"}`}>About</NavLink>
              <NavLink to="/orders" onClick={() => setMobileOpen(false)} className={({ isActive }) => `block py-3 px-3 rounded-lg text-base font-medium ${isActive ? "text-violet-600 bg-violet-50 dark:bg-violet-900/20" : "text-gray-700 dark:text-gray-300"}`}>Orders</NavLink>
              {user && (
                <NavLink to="/admin" onClick={() => setMobileOpen(false)} className={({ isActive }) => `block py-3 px-3 rounded-lg text-base font-semibold ${isActive ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20" : "text-indigo-600 dark:text-indigo-400"}`}>⚡ Admin Dashboard</NavLink>
              )}
            </div>
            <div className="p-4 pt-6 border-t border-gray-200 dark:border-gray-800 space-y-1">
              <button type="button" onClick={() => setDarkMode((d) => !d)} className="flex items-center gap-3 w-full py-3 px-3 rounded-lg text-gray-700 dark:text-gray-300">
                {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />} {darkMode ? "Light" : "Dark"}
              </button>
              <NavLink to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-700 dark:text-gray-300">
                <FiUser className="h-5 w-5" /> {user ? "Account" : "Login"}
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
