import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiMessageSquare, FiLoader, FiInfo } from 'react-icons/fi';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! I'm ObitoBot 🤖. How can I help you today?", isBot: true },
    ]);
    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState("");

    const predefinedOptions = [
        "Where is my order?",
        "Do you ship internationally?",
        "What is your return policy?",
        "Just browsing!"
    ];

    const handleSend = (text) => {
        const userMsg = text || input;
        if (!userMsg.trim()) return;

        // User Message
        setMessages(prev => [...prev, { id: Date.now(), text: userMsg, isBot: false }]);
        setInput("");
        setTyping(true);

        // Advanced AI Logic Simulation
        setTimeout(() => {
            let botResponse = "I'm not sure about that. Try asking about orders, shipping, or returns.";
            const lowerMsg = userMsg.toLowerCase();

            if (lowerMsg.includes("order") && (lowerMsg.includes("where") || lowerMsg.includes("track") || lowerMsg.includes("status"))) {
                botResponse = "To track your order, please enter your Order ID (e.g., ORD-7782-XJ). You can also find this in your 'Orders' page.";
            } else if (lowerMsg.includes("ord-")) {
                botResponse = `Checking status for ${userMsg}... 🔍\n\nResult: 🚚 In Transit\nEst. Delivery: Tomorrow by 8 PM.`;
            } else if (lowerMsg.includes("ship") || lowerMsg.includes("international")) {
                botResponse = "We ship globally! 🌍 Free shipping on orders over $150. Standard delivery takes 3-5 business days.";
            } else if (lowerMsg.includes("return") || lowerMsg.includes("refund")) {
                botResponse = "Returns are hassle-free! You have 30 days to return items. Visit our 'Returns Center' to generate a label.";
            } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
                botResponse = "Hello! 👋 I'm ObitoBot. Looking for some fresh gear today?";
            } else if (lowerMsg.includes("recommend") || lowerMsg.includes("suggestion")) {
                botResponse = "Our 'Urban Tech Hoodie' is trending right now! 🔥 Check out the 'New Arrivals' section.";
            } else if (lowerMsg.includes("store")) {
                botResponse = "We have flagship stores in Tokyo, NYC, and London. Check the 'About Us' page for our map!";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, isBot: true }]);
            setTyping(false);
        }, 1200);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white dark:bg-gray-900 w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 pointer-events-auto overflow-hidden mb-4 flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-black dark:bg-gray-800 p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                                    <FiMessageSquare size={16} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Obito Assistant</h4>
                                    <span className="flex items-center gap-1 text-[10px] text-green-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-[#0b0f19] space-y-4 scrollbar-thin">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.isBot ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm rounded-tl-sm' : 'bg-indigo-600 text-white rounded-tr-sm'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {typing && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-sm rounded-tl-sm text-gray-500">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                            {/* Quick Options */}
                            <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-none">
                                {predefinedOptions.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSend(opt)}
                                        className="whitespace-nowrap px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition border border-gray-200 dark:border-gray-700"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                                />
                                <button type="submit" className="bg-black dark:bg-white text-white dark:text-black p-3 rounded-xl hover:opacity-90 transition">
                                    <FiSend />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-black dark:bg-white text-white dark:text-black p-4 rounded-full shadow-2xl hover:scale-110 transition active:scale-95 pointer-events-auto border-2 border-transparent ${isOpen ? 'rotate-90' : ''}`}
            >
                {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
            </button>
        </div>
    );
};

export default Chatbot;
