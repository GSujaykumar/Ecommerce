import React, { useState, useEffect } from "react";
import { FiX, FiMail } from "react-icons/fi";

const NewsletterPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after 5 seconds if not already subscribed/dismissed for this session
        const timer = setTimeout(() => {
            const hasSeen = sessionStorage.getItem("newsletter_seen");
            if (!hasSeen) {
                setIsOpen(true);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("newsletter_seen", "true");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsOpen(false);
        sessionStorage.setItem("newsletter_seen", "true");
        // Could add toast here if connected
        alert("Thanks for subscribing! Use code OBITO10 for 10% off.");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl animate-scale-up">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                    <FiX size={20} className="text-gray-500 dark:text-gray-400" />
                </button>

                <div className="p-8 md:p-10 text-center relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-black dark:bg-white rounded-2xl mb-6 shadow-lg rotate-3">
                        <FiMail size={32} className="text-white dark:text-black" />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">10% Off</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-sm mx-auto">
                        Join the <span className="font-bold text-black dark:text-white">ObitoStore</span> elite. Get exclusive drops, secret sales, and 10% off your first order.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white transition"
                            required
                        />
                        <button className="w-full py-4 rounded-xl font-bold bg-black dark:bg-white text-white dark:text-black shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
                            Subscribe & Get Code
                        </button>
                    </form>

                    <p className="text-xs text-gray-400 mt-6">
                        No spam, ever. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NewsletterPopup;
