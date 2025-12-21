import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { FiShoppingCart, FiHeart, FiUser, FiSearch } from "react-icons/fi";
import { FiMoon, FiSun } from "react-icons/fi";


function Header() {
    const [darkMode, setDarkMode] = useState(false);
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
        <header className="bg-white dark:bg-darkbg fixed top-0 left-0 w-full z-50 transition-colors duration-300  ">

            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            alt=""
                            className="h-8 w-auto"
                        />
                    </a>
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        command="show-modal"
                        commandfor="mobile-menu"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            data-slot="icon"
                            aria-hidden="true"
                            className="size-6"
                        >
                            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <el-popover-group className="hidden lg:flex lg:gap-x-12 ">
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
                </el-popover-group>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-6">
                    {/* Search */}
                    <button className="p-2 rounded-full hover:bg-gray-100 transition">
                        <FiSearch className="text-xl text-white-700" />
                    </button>
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        {darkMode ? (
                            <FiSun className="text-xl text-yellow-400" />
                        ) : (
                            <FiMoon className="text-xl text-white-700" />
                        )}
                    </button>


                    {/* Wishlist */}
                    <NavLink
                        to="/faviorutes"
                        className="relative p-2 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
                    >
                        <FiHeart className="text-xl text-gray-700 dark:text-white" />
                        <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs px-1.5 rounded-full">
                            2
                        </span>
                    </NavLink>

                    {/* Cart */}
                    <button command="show-modal" commandfor="drawer" className="relative p-2 rounded-full hover:bg-gray-100 transition">
                        <FiShoppingCart className="text-xl text-gray-700  dark:text-white" />
                        <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs px-1.5 rounded-full">
                            2
                        </span>
                    </button>

                    {/* User Profile */}
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition">
                        <FiUser className="text-xl text-gray-700 dark:text-white " />
                        <span className="text-sm font-semibold dark:var(--color-dark-text-secondary)">Account</span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <el-dialog>
                <dialog id="mobile-menu" className="backdrop:bg-transparent lg:hidden">
                    <div tabIndex="0" className="fixed inset-0 focus:outline-none">
                        <el-dialog-panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                        alt=""
                                        className="h-8 w-auto"
                                    />
                                </a>
                                <button type="button" command="close" commandfor="mobile-menu" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                    <span className="sr-only">Close menu</span>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        data-slot="icon"
                                        aria-hidden="true"
                                        className="size-6"
                                    >
                                        <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            {/* Mobile menu links here */}



                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-200">

                                    {/* Main Links */}
                                    <div className="space-y-2 py-6">
                                        <NavLink
                                            to="/"
                                            end
                                            className="block rounded-xl px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-100 transition"
                                        >
                                            Home
                                        </NavLink>

                                        <NavLink
                                            to="/men"
                                            className="block rounded-xl px-4 py-3 text-base font-semibold text-gray-100 hover:bg-gray-100 transition"
                                        >
                                            Men
                                        </NavLink>

                                        <NavLink
                                            to="/women"
                                            className="block rounded-xl px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-100 transition"
                                        >
                                            Women
                                        </NavLink>

                                        <NavLink
                                            to="/kids"
                                            className="block rounded-xl px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-100 transition"
                                        >
                                            Kids
                                        </NavLink>

                                        <NavLink
                                            to="/about"
                                            className="block rounded-xl px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-100 transition"
                                        >
                                            About
                                        </NavLink>

                                        <NavLink
                                            to="/contact"
                                            className="block rounded-xl px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-100 transition"
                                        >
                                            Contact
                                        </NavLink>
                                    </div>

                                    {/* Divider */}
                                    <div className="py-6 space-y-4">
                                        {/* Search */}
                                        <button className="p-2 rounded-full hover:bg-gray-100 transition">
                                            <FiSearch className="text-xl text-white-700" />
                                        </button>
                                        {/* Dark Mode Toggle */}
                                        <button
                                            onClick={() => setDarkMode(!darkMode)}
                                            className="p-2 rounded-full hover:bg-gray-100"
                                        >
                                            {darkMode ? (
                                                <FiSun className="text-xl text-yellow-400" />
                                            ) : (
                                                <FiMoon className="text-xl text-white-700" />
                                            )}
                                        </button>

                                        {/* Wishlist */}
                                        <NavLink
                                            to="/faviorutes"
                                            className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100 transition"
                                        >
                                            <FiHeart className="text-xl" />
                                            Wishlist
                                        </NavLink>

                                        {/* Cart */}
                                        <button
                                            command="show-modal"
                                            commandfor="drawer"
                                            className="w-full flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100 transition"
                                        >
                                            <FiShoppingCart className="text-xl" />
                                            Cart
                                        </button>

                                        {/* Account */}
                                        <button className="w-full flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100 transition">
                                            <FiUser className="text-xl" />
                                            Account
                                        </button>
                                    </div>

                                </div>
                            </div>

                        </el-dialog-panel>
                    </div>
                </dialog>
            </el-dialog>

            {/* Scroll Progress Bar */}
            <div className="w-full">
                <div
                    className="h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-100 ease-linear"
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>
        </header>
    );
}

export default Header;
