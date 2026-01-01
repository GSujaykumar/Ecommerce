import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

import { FiShoppingCart, FiHeart, FiUser, FiSearch } from "react-icons/fi";
import { FiMoon, FiSun } from "react-icons/fi";


function Header() {
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const { cartItems, favoriteItems, setIsCartOpen } = useContext(ShopContext);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const favCount = favoriteItems.length;

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);


    const linkClass = ({ isActive }) =>
        `
    text-sm/6 font-semibold transition
    text-[var(--color-text-primary)]
    hover:text-[var(--color-text-secondary)]
    dark:text-[var(--color-dark-text-primary)]
    ${isActive
            ? "border-b-3 border-[var(--color-text-primary)] dark:border-[var(--color-dark-text-primary)]"
            : "border-b-2 border-transparent"
        }
  `;

    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="bg-white dark:bg-gray-900 fixed top-0 left-0 w-full z-40 transition-colors duration-300 shadow-sm">

            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <NavLink to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            alt=""
                            className="h-8 w-auto"
                        />
                    </NavLink>
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="size-6"
                        >
                            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="hidden lg:flex lg:gap-x-12">
                    <NavLink to="/men" className={linkClass}>
                        Men
                    </NavLink>

                    <NavLink to="/women" className={linkClass}>
                        Women
                    </NavLink>
                    <NavLink to="/kids" className={linkClass}>
                        Kids
                    </NavLink>
                    <NavLink to="/" end className={linkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={linkClass}>
                        About
                    </NavLink>
                    <NavLink to="/contact" className={linkClass}>
                        Contact
                    </NavLink>
                    <NavLink to="/order-history" className={linkClass}>
                        Orders
                    </NavLink>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-6">
                    {/* Search */}
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (searchQuery.trim()) {
                            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                        }
                    }} className="relative group">
                        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2 transition-all duration-300 w-10 group-focus-within:w-64 focus-within:w-64 overflow-hidden">
                            <button type="submit" className="p-1">
                                <FiSearch className="text-xl text-gray-500 dark:text-gray-300" />
                            </button>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="bg-transparent border-none outline-none text-sm ml-2 text-gray-900 dark:text-white w-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-200"
                            />
                        </div>
                    </form>
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        {darkMode ? (
                            <FiSun className="text-xl text-yellow-400" />
                        ) : (
                            <FiMoon className="text-xl text-gray-700 dark:text-gray-200" />
                        )}
                    </button>


                    {/* Wishlist */}
                    <NavLink
                        to="/favorites"
                        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center justify-center"
                    >
                        <FiHeart className="text-xl text-gray-700 dark:text-white" />
                        {favCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-1.5 rounded-full">
                                {favCount}
                            </span>
                        )}
                    </NavLink>

                    {/* Cart */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        <FiShoppingCart className="text-xl text-gray-700 dark:text-white" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs px-1.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* User Profile */}
                    <NavLink
                        to="/login"
                        className="w-full flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        <FiUser className="text-xl" />
                        Account
                    </NavLink>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 p-6 sm:max-w-sm shadow-xl transition transform duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <NavLink to="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                    className="h-8 w-auto"
                                />
                            </NavLink>
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
                            >
                                <span className="sr-only">Close menu</span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="size-6"
                                >
                                    <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="flow-root">
                            <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                                <div className="space-y-2 py-6">
                                    {['Home', 'Men', 'Women', 'Kids', 'About', 'Contact'].map((item) => (
                                        <NavLink
                                            key={item}
                                            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block rounded-xl px-4 py-3 text-base font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                        >
                                            {item}
                                        </NavLink>
                                    ))}
                                </div>

                                <div className="py-6 space-y-4">
                                    <button
                                        onClick={() => setDarkMode(!darkMode)}
                                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                    >
                                        {darkMode ? <FiSun className="text-xl text-yellow-400" /> : <FiMoon className="text-xl" />}
                                        {darkMode ? "Light Mode" : "Dark Mode"}
                                    </button>

                                    <NavLink
                                        to="/favorites"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                    >
                                        <FiHeart className="text-xl" />
                                        Wishlist ({favCount})
                                    </NavLink>

                                    <button
                                        onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}
                                        className="w-full flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                    >
                                        <FiShoppingCart className="text-xl" />
                                        Cart ({cartCount})
                                    </button>

                                    <NavLink
                                        to="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                    >
                                        <FiUser className="text-xl" />
                                        Account
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Scroll Progress Bar */}
            <div className="w-full">
                <div
                    className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-100 ease-linear"
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>
        </header>
    );
}

export default Header;
