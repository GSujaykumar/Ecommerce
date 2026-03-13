import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiX, FiSend, FiMessageSquare, FiShoppingBag, FiPackage,
    FiRefreshCw, FiSearch, FiHelpCircle, FiChevronRight, FiStar,
    FiTruck, FiTag, FiZap
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { getAllProducts, getMyOrders } from '../api';
import { formatPrice } from '../utils';

// ─── Smart Brain ─────────────────────────────────────────────────────────────
const KB = {
    greet: ["hi", "hello", "hey", "heyy", "sup", "wassup", "namaste", "yo"],
    order: ["order", "delivery", "track", "tracking", "shipped", "dispatch", "when will", "my order"],
    return: ["return", "refund", "exchange", "money back", "cancel", "replace"],
    shipping: ["ship", "shipping", "delivery time", "how long", "days", "international", "express"],
    payment: ["payment", "pay", "card", "upi", "cod", "cash", "stripe", "wallet"],
    discount: ["discount", "coupon", "promo", "offer", "sale", "code", "off"],
    size: ["size", "sizing", "fit", "measurement", "chart", "xs", "small", "medium", "large", "xl"],
    product: ["product", "recommend", "suggest", "best", "popular", "new", "trending", "buy"],
    help: ["help", "support", "contact", "talk", "human", "agent"],
    bye: ["bye", "goodbye", "thanks", "thank you", "ok done", "great", "perfect"],
};

const matchKB = (msg) => {
    const m = msg.toLowerCase();
    for (const [key, terms] of Object.entries(KB)) {
        if (terms.some(t => m.includes(t))) return key;
    }
    return null;
};

// ─── Response Engine ─────────────────────────────────────────────────────────
const buildResponse = async (msg, orders, products, user) => {
    const intent = matchKB(msg);
    const m = msg.toLowerCase();

    // 1. Order tracking with real data
    if (intent === 'order') {
        if (!user) {
            return {
                text: "Please **login** first to check your orders. Once logged in, I can show you real-time order status! 🔐",
                quick: ["Go to Login →"]
            };
        }
        if (orders.length === 0) {
            return {
                text: `Hi ${user.fullName || 'there'}! 📦 You don't have any orders yet. Start shopping and I'll help you track everything!`,
                quick: ["Browse Products", "View Categories"]
            };
        }
        const latest = orders[0];
        return {
            text: `📦 Your latest order **#${latest.orderNumber || latest.id}** is currently **${latest.status || 'Processing'}**.\n\nTotal: **${formatPrice ? formatPrice(latest.totalPrice || 0) : '₹' + (latest.totalPrice || 0)}**\n\nYou have **${orders.length} order(s)** in total.`,
            quick: ["View All Orders", "Track Shipping", "Start New Order"],
            link: { to: "/orders", label: "📋 View All Orders" }
        };
    }

    // 2. High-Fidelity Spring AI Call (The "AI World" Brain)
    // If it's a general question or product recommendation, use the AI Backend
    if (intent === 'product' || intent === null || m.length > 20) {
        try {
            const response = await axios.get(`http://localhost:8080/api/products/ai/chat?message=${encodeURIComponent(msg)}`);
            const aiText = response.data;

            // If AI mentions products, we find them in our local list to show cards
            const suggestedProducts = products.filter(p =>
                aiText.toLowerCase().includes(p.title.toLowerCase().split(' ')[0])
            ).slice(0, 3);

            return {
                text: aiText,
                quick: suggestedProducts.length > 0 ? ["Add to Cart", "View Details"] : ["Men's Fashion", "Electronics", "Deals"],
                productCards: suggestedProducts
            };
        } catch (error) {
            console.warn("AI Backend unreachable, falling back to local KB", error);
            // Fallback to local KB below...
        }
    }

    if (intent === 'greet') {
        const name = user?.fullName?.split(' ')[0] || 'there';
        return {
            text: `Hey ${name}! 👋 I'm **ObitoBot**, your AI shopping assistant.\n\nI can help you with orders, product recommendations, returns, and much more. What's on your mind?`,
            quick: ["Track My Order", "Get Recommendations", "Return Policy", "Shipping Info"]
        };
    }

    if (intent === 'return') {
        return {
            text: "🔄 **Return Policy**\n\n✅ 30-day hassle-free returns\n✅ Free pickup from your doorstep\n✅ Refund in 5-7 business days\n\nTo start a return, just go to **My Orders** and click 'Return Item' on any eligible order.",
            quick: ["View My Orders", "Contact Support", "Browse More"],
            link: { to: "/orders", label: "🛍️ Go to My Orders" }
        };
    }

    if (intent === 'shipping') {
        return {
            text: "🚚 **Shipping Info**\n\n📦 Standard: 3-5 business days\n⚡ Express: 1-2 business days\n🌍 International: 7-14 business days\n\n**Free shipping** on orders above ₹999!",
            quick: ["Check My Order", "Express Delivery?", "International Shipping"]
        };
    }

    if (intent === 'payment') {
        return {
            text: "💳 **Payment Options**\n\nWe accept:\n✅ Credit/Debit Cards\n✅ UPI (GPay, PhonePe, Paytm)\n✅ Cash on Delivery\n✅ Net Banking\n✅ Wallets\n\nAll payments are 100% secure and encrypted via Stripe.",
            quick: ["Place an Order", "Any Offers?", "Help with Payment"]
        };
    }

    if (intent === 'discount') {
        return {
            text: "🎉 **Current Offers**\n\n🔖 **WELCOME10** – 10% off your first order!\n🔖 **SAVE20** – 20% off orders above ₹2000\n🔖 Free shipping on orders above ₹999\n\nCheck our **Flash Sale** section for limited-time deals!",
            quick: ["Shop Now", "Flash Sale", "Track Order"]
        };
    }

    if (intent === 'size') {
        return {
            text: "📏 **Size Guide**\n\nFor most clothing items:\n- **S** → Chest 36\"\n- **M** → Chest 38-40\"\n- **L** → Chest 42-44\"\n- **XL** → Chest 46\"\n\nWhen in doubt, size up for a relaxed fit! 😊",
            quick: ["Browse Men's", "Browse Women's", "Contact Support"]
        };
    }

    if (intent === 'bye') {
        return {
            text: "Thanks for chatting! 🙏 Happy shopping at **ObitoStore**! If you need anything, I'm always here. Have a great day! ✨",
            quick: ["Back to Shopping", "View My Cart"]
        };
    }

    return {
        text: "Hmm, I'm still learning! 🤔 But I can definitely help with:\n\n• 📦 Order tracking\n• 🔄 Returns & refunds\n• 🛍️ Product recommendations\n• 💳 Payment & shipping info\n\nWhat would you like to know?",
        quick: ["Track My Order", "Product Recommendations", "Return Policy", "Shipping Info"]
    };
};

// ─── Product Card in Chat ─────────────────────────────────────────────────────
const ChatProductCard = ({ product }) => (
    <Link to={`/product/${product.id}`} className="block">
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition border border-gray-100 dark:border-gray-700 group">
            <img src={product.image} alt={product.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 dark:text-white truncate group-hover:text-indigo-600 transition">{product.title}</p>
                <p className="text-xs text-indigo-600 font-bold">{formatPrice ? formatPrice(product.price) : '₹' + product.price}</p>
            </div>
            <FiChevronRight className="text-gray-400 flex-shrink-0" size={12} />
        </div>
    </Link>
);

// ─── Bot Avatar ───────────────────────────────────────────────────────────────
const BotAvatar = () => (
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 shadow-md">
        <FiZap size={12} />
    </div>
);

// ─── Message Bubble ───────────────────────────────────────────────────────────
const MessageBubble = ({ msg, onQuick }) => {
    const formatText = (text) => {
        return text
            .split('\n')
            .map((line, i) => (
                <span key={i}>
                    {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                    )}
                    {i < text.split('\n').length - 1 && <br />}
                </span>
            ));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${msg.isBot ? 'justify-start' : 'justify-end'}`}
        >
            {msg.isBot && <BotAvatar />}
            <div className="flex flex-col gap-2 max-w-[82%]">
                {/* Text bubble */}
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.isBot
                    ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm rounded-tl-sm border border-gray-100 dark:border-gray-700'
                    : 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-tr-sm shadow-md'
                    }`}>
                    {formatText(msg.text)}
                </div>

                {/* Product cards */}
                {msg.isBot && msg.productCards?.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                        {msg.productCards.map(p => <ChatProductCard key={p.id} product={p} />)}
                    </div>
                )}

                {/* CTA link */}
                {msg.isBot && msg.link && (
                    <Link
                        to={msg.link.to}
                        className="self-start text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-full hover:bg-indigo-700 transition font-medium flex items-center gap-1"
                    >
                        {msg.link.label} <FiChevronRight size={12} />
                    </Link>
                )}

                {/* Quick replies */}
                {msg.isBot && msg.quick?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {msg.quick.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => onQuick(opt)}
                                className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 px-3 py-1.5 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition font-medium"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// ─── Typing Indicator ─────────────────────────────────────────────────────────
const TypingIndicator = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 justify-start">
        <BotAvatar />
        <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex gap-1 items-center h-4">
                {[0, 0.2, 0.4].map((d, i) => (
                    <span key={i} className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
                ))}
            </div>
        </div>
    </motion.div>
);

// ─── Main Chatbot ─────────────────────────────────────────────────────────────
const Chatbot = () => {
    const { user } = useContext(ShopContext);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState('');
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [unreadCount, setUnreadCount] = useState(1);
    const endRef = useRef(null);

    // Initial greeting
    useEffect(() => {
        const name = user?.fullName?.split(' ')[0] || 'there';
        setMessages([{
            id: 1,
            text: `Hey ${name}! 👋 I'm **ObitoBot**, your personal AI shopping assistant.\n\nI have access to your real orders and live product catalog. Ask me anything!`,
            isBot: true,
            quick: ["Track My Order 📦", "Recommendations 🔥", "Return Policy 🔄", "Flash Deals 🎉"],
        }]);
    }, [user]);

    // Fetch context data on open
    useEffect(() => {
        if (isOpen) {
            setUnreadCount(0);
            getAllProducts().then(p => setProducts(p || [])).catch(() => { });
            if (user) getMyOrders().then(o => setOrders(o || [])).catch(() => { });
        }
    }, [isOpen, user]);

    // Auto-scroll
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    const sendMessage = async (text) => {
        const msg = (text || input).trim();
        if (!msg) return;

        setInput('');
        const userMsg = { id: Date.now(), text: msg, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        setTyping(true);

        // Simulate network latency for premium feel
        const delay = 600 + Math.random() * 600;
        await new Promise(r => setTimeout(r, delay));

        const response = await buildResponse(msg, orders, products, user);
        const botMsg = { id: Date.now() + 1, isBot: true, ...response };
        setMessages(prev => [...prev, botMsg]);
        setTyping(false);
    };

    const clearChat = () => {
        const name = user?.fullName?.split(' ')[0] || 'there';
        setMessages([{
            id: Date.now(),
            text: `Chat cleared! How can I help you, ${name}? 😊`,
            isBot: true,
            quick: ["Track My Order 📦", "Get Recommendations 🔥", "Return Policy 🔄"],
        }]);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 16 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="mb-4 w-[350px] sm:w-[390px] pointer-events-auto rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800"
                        style={{ height: '560px' }}
                    >
                        {/* ── Header ── */}
                        <div className="flex-shrink-0 bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white border border-white/30">
                                        <FiZap size={16} />
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-indigo-600 animate-pulse" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm tracking-wide">ObitoBot AI</h4>
                                    <p className="text-white/70 text-[10px]">Always Online • Powered by Intelligence</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={clearChat} title="Clear chat" className="text-white/60 hover:text-white transition p-1.5 rounded-lg hover:bg-white/10">
                                    <FiRefreshCw size={14} />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition p-1.5 rounded-lg hover:bg-white/10">
                                    <FiX size={16} />
                                </button>
                            </div>
                        </div>

                        {/* ── Context Pills ── */}
                        {user && (
                            <div className="flex-shrink-0 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 flex items-center gap-3 border-b border-indigo-100 dark:border-indigo-900/50">
                                <span className="flex items-center gap-1 text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                                    <FiPackage size={10} /> {orders.length} Orders
                                </span>
                                <span className="flex items-center gap-1 text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                                    <FiShoppingBag size={10} /> {products.length} Products
                                </span>
                                <span className="flex items-center gap-1 text-[10px] text-green-600 font-semibold ml-auto">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Context Loaded
                                </span>
                            </div>
                        )}

                        {/* ── Messages ── */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-[#0b0f19] space-y-3">
                            {messages.map(msg => (
                                <MessageBubble key={msg.id} msg={msg} onQuick={sendMessage} />
                            ))}
                            {typing && <TypingIndicator />}
                            <div ref={endRef} />
                        </div>

                        {/* ── Input ── */}
                        <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-3">
                            <form
                                onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                                className="flex gap-2 items-center"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask me anything..."
                                    className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white dark:placeholder-gray-500 transition"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-3 rounded-xl hover:opacity-90 transition active:scale-95 disabled:opacity-40 shadow-md"
                                >
                                    <FiSend size={15} />
                                </button>
                            </form>
                            <p className="text-center text-[10px] text-gray-400 dark:text-gray-600 mt-2">
                                ObitoBot is AI-powered — not always perfect, but always helpful ✨
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── FAB Button ── */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative pointer-events-auto w-14 h-14 bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-full shadow-2xl hover:shadow-indigo-500/30 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <FiX size={22} />
                        </motion.span>
                    ) : (
                        <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                            <FiZap size={22} />
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Unread Badge */}
                {!isOpen && unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow"
                    >
                        {unreadCount}
                    </motion.span>
                )}

                {/* Ping ring */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-20" />
                )}
            </button>
        </div>
    );
};

export default Chatbot;
