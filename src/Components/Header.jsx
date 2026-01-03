
import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

import { FiShoppingCart, FiHeart, FiUser, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FiMoon, FiSun } from "react-icons/fi";


function Header() {
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const linkClass = ({ isActive }) =>
        `text-sm font-medium transition duration-200 ${isActive
            ? "text-indigo-600 dark:text-indigo-400"
            : "text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] hover:text-indigo-600 dark:hover:text-indigo-400"
        }`;

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-800/50"
                    : "bg-transparent py-2"
                }`}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">

                {/* Logo */}
                <div className="flex lg:flex-1">
                    <NavLink to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            O
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Obito<span className="text-indigo-600">Store</span></span>
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
                    >
                        <span className="sr-only">Open main menu</span>
                        <FiMenu className="h-6 w-6" />
                    </button>
                </div>

                {/* Desktop Nav */}
                <div className="hidden lg:flex lg:gap-x-10">
                    <NavLink to="/" className={linkClass}>Home</NavLink>
                    <NavLink to="/men" className={linkClass}>Men</NavLink>
                    <NavLink to="/women" className={linkClass}>Women</NavLink>
                    <NavLink to="/kids" className={linkClass}>Kids</NavLink>
                    <NavLink to="/about" className={linkClass}>Our Story</NavLink>
                </div>

                {/* Right Icons */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">

                    {/* Search Bar */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                        }}
                        className="relative hidden xl:block"
                    >
                        <div className="flex items-center bg-gray-100 dark:bg-gray-800/50 rounded-full px-4 py-2 border border-transparent focus-within:border-indigo-500 transition-all w-64">
                            <FiSearch className="text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="bg-transparent border-none outline-none text-sm ml-2 text-gray-900 dark:text-white w-full placeholder-gray-500"
                            />
                        </div>
                    </form>

                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

                    {/* Dark Mode */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition"
                    >
                        {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                    </button>

                    {/* Favorites */}
                    <NavLink to="/favorites" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition">
                        <FiHeart className="w-5 h-5" />
                        {favCount > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full ring-2 ring-white dark:ring-gray-900">
                                {favCount}
                            </span>
                        )}
                    </NavLink>

                    {/* Cart */}
                    <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition">
                        <FiShoppingCart className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center bg-indigo-600 text-white text-[10px] font-bold rounded-full ring-2 ring-white dark:ring-gray-900">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <NavLink to="/login" className="ml-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition">
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <FiUser className="w-4 h-4" />
                        </div>
                    </NavLink>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 p-6 sm:max-w-sm shadow-2xl transform transition-transform duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <span className="font-bold text-xl text-gray-900 dark:text-white">Menu</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-600 dark:text-gray-400">
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="flex flex-col gap-4">
                                {['Home', 'Men', 'Women', 'Kids', 'About', 'Contact'].map((item) => (
                                    <NavLink
                                        key={item}
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={({ isActive }) => `text-lg font-medium ${isActive ? 'text-indigo-600' : 'text-gray-900 dark:text-gray-100'}`}
                                    >
                                        {item}
                                    </NavLink>
                                ))}
                            </div>

                            <hr className="border-gray-100 dark:border-gray-800" />

                            <div className="flex flex-col gap-4">
                                <button onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    {darkMode ? <FiSun /> : <FiMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
                                </button>
                                <NavLink to="/login" className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <FiUser /> Account
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
