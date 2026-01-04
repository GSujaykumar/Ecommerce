import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { formatPrice } from '../utils';
import { FiPackage, FiTruck, FiCheck, FiClock, FiMapPin, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Orders = () => {
    // Mock orders since we don't have a real backend for order history yet
    // In a real app, this would come from the ShopContext or an API
    const mockOrders = [
        {
            id: "ORD-7782-XJ",
            date: "Oct 24, 2023",
            total: 245.99,
            status: "Delivered",
            items: [
                { id: 1, title: "Urban Tech Hoodie", image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", quantity: 1, price: 120.00 },
                { id: 2, title: "Cargo Joggers", image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", quantity: 2, price: 62.99 }
            ]
        },
        {
            id: "ORD-9921-MC",
            date: "Nov 02, 2023",
            total: 89.50,
            status: "In Transit",
            items: [
                { id: 3, title: "Cyberpunk Windbreaker", image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", quantity: 1, price: 89.50 }
            ]
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'In Transit': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Processing': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    return (
        <section className="min-h-screen bg-gray-50 dark:bg-[#050505] pt-32 pb-12 px-4 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Your Orders</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Check the status of recent purchases</p>
                    </div>
                    <Link to="/" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 flex items-center gap-1">
                        Continue Shopping <FiChevronRight />
                    </Link>
                </div>

                <div className="space-y-6">
                    {mockOrders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-[#121212] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
                        >
                            {/* Order Header */}
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50 dark:bg-gray-900/20">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Order ID</div>
                                        <div className="font-mono font-medium text-gray-900 dark:text-white mt-1">{order.id}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Date Placed</div>
                                        <div className="font-medium text-gray-900 dark:text-white mt-1">{order.date}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Amount</div>
                                        <div className="font-bold text-gray-900 dark:text-white mt-1">{formatPrice(order.total)}</div>
                                    </div>
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${getStatusColor(order.status)}`}>
                                    {order.status === 'Delivered' && <FiCheck className="w-4 h-4" />}
                                    {order.status === 'In Transit' && <FiTruck className="w-4 h-4" />}
                                    {order.status === 'Processing' && <FiClock className="w-4 h-4" />}
                                    {order.status}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-6">
                                <div className="space-y-6">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 p-2">
                                                <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title}</h4>
                                                <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">{formatPrice(item.price)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Actions */}
                                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <FiMapPin />
                                        <span>Tracking Number: <span className="font-mono text-gray-700 dark:text-gray-300">TRK-{Math.floor(Math.random() * 100000)}</span></span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition">
                                            View Invoice
                                        </button>
                                        <button className="px-4 py-2 text-sm font-bold bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 transition shadow-sm">
                                            Track Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Orders;
