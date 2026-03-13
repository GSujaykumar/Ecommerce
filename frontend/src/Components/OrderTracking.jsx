import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiTruck, FiPackage, FiBox, FiMapPin, FiSearch, FiAlertCircle } from 'react-icons/fi';
import { ShopContext } from '../Context/ShopContext';
import { getMyOrders } from '../api';
import { formatPrice } from '../utils';

export default function OrderTracking() {
    const { user } = useContext(ShopContext);
    const [orderId, setOrderId] = useState('');
    const [isTracking, setIsTracking] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orderInfo, setOrderInfo] = useState(null);
    const [error, setError] = useState('');

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!orderId.trim()) return;

        setIsTracking(true);
        setLoading(true);
        setError('');

        try {
            if (!user) {
                // If not logged in, mock it for demo purposes, but show a warning
                await new Promise(r => setTimeout(r, 1500));
                setOrderInfo({
                    id: orderId,
                    status: 'SHIPPED',
                    placedAt: new Date(Date.now() - 86400000).toISOString(),
                    totalPrice: 4299,
                    demo: true
                });
            } else {
                const orders = await getMyOrders();
                const found = orders.find(o =>
                    (o.orderNumber && o.orderNumber.toString() === orderId) ||
                    (o.id && o.id.toString() === orderId)
                );

                if (found) {
                    setOrderInfo(found);
                } else {
                    setError(`Order #${orderId} not found in your account.`);
                }
            }
        } catch (err) {
            setError('Failed to fetch order details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Calculate progress based on status
    const getStatusState = (status) => {
        const s = (status || '').toUpperCase();
        if (s === 'DELIVERED') return 4;
        if (s === 'OUT_FOR_DELIVERY') return 3;
        if (s === 'SHIPPED') return 2;
        if (s === 'PROCESSING') return 1;
        return 0; // PLACED / PENDING
    };

    const currentStepIndex = orderInfo ? getStatusState(orderInfo.status) : 0;

    const steps = [
        { name: 'Order Placed', icon: FiBox, desc: 'We have received your order' },
        { name: 'Processing', icon: FiPackage, desc: 'Order is being packed' },
        { name: 'Shipped', icon: FiTruck, desc: 'Handed over to courier' },
        { name: 'Out for Delivery', icon: FiMapPin, desc: 'Arriving today' },
        { name: 'Delivered', icon: FiCheckCircle, desc: 'Package delivered' }
    ];

    return (
        <div className="bg-gray-50 dark:bg-[#0b0f19] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* ── Header & Search ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-900 shadow-2xl shadow-indigo-500/5 rounded-3xl overflow-hidden p-8 border border-gray-100 dark:border-gray-800 relative z-10"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <FiTruck size={200} />
                    </div>

                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 mb-2">
                        Track Your Order
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-lg">
                        Enter your Order ID below to get real-time tracking updates and delivery status.
                    </p>

                    <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 max-w-2xl relative z-10">
                        <div className="relative flex-1">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                className="block w-full rounded-2xl border-0 py-4 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base bg-white dark:bg-gray-800 dark:ring-gray-700 dark:text-white transition-all"
                                placeholder="Order ID (e.g. 1024)"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!orderId.trim() || loading}
                            className="flex-none rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Track <FiTruck /></>
                            )}
                        </button>
                    </form>

                    {!user && (
                        <p className="text-xs text-amber-500 mt-4 flex items-center gap-1.5 font-medium">
                            <FiAlertCircle /> Fast tracking available. Log in to track directly from your history.
                        </p>
                    )}
                </motion.div>

                {/* ── Results ── */}
                <AnimatePresence mode="wait">
                    {isTracking && !loading && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            {error ? (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-2xl p-6 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 text-red-500 rounded-full flex items-center justify-center mb-4">
                                        <FiAlertCircle size={32} />
                                    </div>
                                    <h3 className="text-lg font-bold text-red-800 dark:text-red-400">{error}</h3>
                                    <p className="text-red-600 dark:text-red-500/80 mt-1">Please check the ID and try again.</p>
                                </div>
                            ) : orderInfo && (
                                <div className="bg-white dark:bg-gray-900 shadow-2xl shadow-indigo-500/5 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800">

                                    {/* Order Info Banner */}
                                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 flex-wrap gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                                                ORDER #{orderInfo.orderNumber || orderInfo.id || orderId}
                                            </p>
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                Estimated Delivery: Tomorrow
                                            </h3>
                                            {orderInfo.demo && <p className="text-xs text-amber-500 mt-1">Showing Demo Data (Not logged in)</p>}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Amount</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {formatPrice(orderInfo.totalPrice || 0)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Animated Progress Tracker */}
                                    <div className="p-8 md:p-12 relative overflow-hidden">

                                        {/* Dynamic Truck Animation driving across */}
                                        <div className="absolute top-12 left-0 w-full h-8 px-12 pointer-events-none z-10 hidden sm:block">
                                            <motion.div
                                                className="absolute -top-6 text-indigo-500 drop-shadow-lg"
                                                initial={{ left: '0%' }}
                                                animate={{ left: `${Math.max(5, (currentStepIndex / 4) * 100 - 5)}%` }}
                                                transition={{ type: "spring", damping: 20, stiffness: 50, delay: 0.2 }}
                                            >
                                                <FiTruck size={48} className="transform -scale-x-100" />
                                                <motion.div
                                                    className="w-8 h-1 bg-gray-200/50 rounded-full mt-1 ml-4"
                                                    animate={{ width: [10, 30, 10], opacity: [0.5, 1, 0.5] }}
                                                    transition={{ repeat: Infinity, duration: 1 }}
                                                />
                                            </motion.div>
                                        </div>

                                        <div className="relative max-w-4xl mx-auto pt-16 sm:pt-20">
                                            {/* Connecting Line Base */}
                                            <div className="absolute top-[88px] sm:top-[104px] left-0 right-0 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full -z-10 hidden sm:block mx-12" />

                                            {/* Connecting Line Active */}
                                            <motion.div
                                                className="absolute top-[88px] sm:top-[104px] left-0 h-1.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full -z-10 hidden sm:block ml-12"
                                                initial={{ width: '0%' }}
                                                animate={{ width: `${(currentStepIndex / 4) * 100 - 10}%` }}
                                                transition={{ duration: 1, ease: 'easeOut' }}
                                            />

                                            <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-4 relative z-0">
                                                {steps.map((step, idx) => {
                                                    const isCompleted = idx <= currentStepIndex;
                                                    const isCurrent = idx === currentStepIndex;

                                                    return (
                                                        <div key={idx} className="flex flex-row sm:flex-col items-center sm:text-center gap-4 sm:gap-3 group sm:w-1/5">

                                                            {/* Mobile connector line */}
                                                            {idx !== steps.length - 1 && (
                                                                <div className={`absolute left-7 top-[50px] bottom-[-20px] w-0.5 sm:hidden ${idx < currentStepIndex ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-800'
                                                                    }`} />
                                                            )}

                                                            <motion.div
                                                                initial={{ scale: 0.8, opacity: 0 }}
                                                                animate={{ scale: 1, opacity: 1 }}
                                                                transition={{ delay: idx * 0.15 }}
                                                                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-colors duration-500 ${isCurrent ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/40 scale-110 ring-4 ring-indigo-100 dark:ring-indigo-900/50' :
                                                                        isCompleted ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' :
                                                                            'bg-gray-100 dark:bg-gray-800 text-gray-400 border border-gray-200 dark:border-gray-700'
                                                                    }`}
                                                            >
                                                                <step.icon size={24} />
                                                            </motion.div>

                                                            <div className="sm:mt-2 min-w-0">
                                                                <h4 className={`text-base sm:text-sm font-bold truncate transition-colors ${isCurrent ? 'text-indigo-600 dark:text-indigo-400' :
                                                                        isCompleted ? 'text-gray-900 dark:text-white' :
                                                                            'text-gray-400'
                                                                    }`}>{step.name}</h4>
                                                                <p className="text-xs text-gray-500 mt-0.5 hidden sm:block max-w-[120px] mx-auto leading-tight">
                                                                    {step.desc}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
