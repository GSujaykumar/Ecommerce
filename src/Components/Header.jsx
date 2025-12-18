import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { FiShoppingCart, FiHeart, FiUser, FiSearch } from "react-icons/fi";

function Header() {
    const linkClass = ({ isActive }) =>
        `text-sm/6 font-semibold text-gray-900 transition hover:text-gray-900 ${isActive ? "border-b-3 border-black " : "border-b-2 border-transparent"
        }`;

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
        <header className="bg-white fixed top-0 left-0 w-full z-50">
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

                <el-popover-group className="hidden lg:flex lg:gap-x-12">
                    <div className="relative">
                        <button popoverTarget="desktop-menu-product" className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                            Men
                            <svg
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                data-slot="icon"
                                aria-hidden="true"
                                className="size-5 flex-none text-gray-400"
                            >
                                <path
                                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                />
                            </svg>
                        </button>

                        {/* Popover content here */}
                    </div>

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
                        <FiSearch className="text-xl text-gray-700" />
                    </button>

                    {/* Wishlist */}
                    <NavLink
                        to="/faviorutes"
                        className="relative p-2 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
                    >
                        <FiHeart className="text-xl text-gray-700" />
                        <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs px-1.5 rounded-full">
                            2
                        </span>
                    </NavLink>

                    {/* Cart */}
                    <button command="show-modal" commandfor="drawer" className="relative p-2 rounded-full hover:bg-gray-100 transition">
                        <FiShoppingCart className="text-xl text-gray-700 " />
                        <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs px-1.5 rounded-full">
                            2
                        </span>
                    </button>

                    {/* User Profile */}
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition">
                        <FiUser className="text-xl text-gray-700" />
                        <span className="text-sm font-semibold text-gray-700">Account</span>
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
                                            className="block rounded-xl px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-100 transition"
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
