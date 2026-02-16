import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiMapPin, FiSmile } from 'react-icons/fi';

const DeliveryStats = () => {
    const [stats, setStats] = useState([
        { id: 1, label: "On-Time Delivery", value: 0, target: 98, suffix: "%", icon: <FiClock /> },
        { id: 2, label: "Total Deliveries", value: 0, target: 12500, suffix: "+", icon: <FiCheckCircle /> },
        { id: 3, label: "Cities Covered", value: 0, target: 45, suffix: "", icon: <FiMapPin /> },
        { id: 4, label: "Happy Customers", value: 0, target: 50000, suffix: "+", icon: <FiSmile /> },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prevStats => prevStats.map(stat => {
                if (stat.value < stat.target) {
                    const increment = Math.ceil(stat.target / 100);
                    return { ...stat, value: Math.min(stat.value + increment, stat.target) };
                }
                return stat;
            }));
        }, 20);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-white dark:bg-black py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content - Stats */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2 block">Logistics Excellence</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                                Delivering Happiness <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">at Warp Speed.</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                                Our elite fleet of delivery partners ensures your gear arrives safely and swiftly. We track every mile so you can track your style.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {stats.map((stat) => (
                                    <div key={stat.id} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                                                {stat.icon}
                                            </div>
                                            <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase">{stat.label}</h4>
                                        </div>
                                        <div className="text-3xl font-black text-gray-900 dark:text-white">
                                            {stat.value.toLocaleString()}{stat.suffix}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content - Image */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10"
                        >
                            <div className="absolute inset-0 bg-indigo-600 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-2xl"></div>
                            <img
                                src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=2670&auto=format&fit=crop"
                                alt="Delivery Partner"
                                className="rounded-3xl shadow-2xl w-full h-[600px] object-cover relative z-10 border-4 border-white dark:border-gray-800"
                            />

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-20"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 animate-pulse">
                                        <FiCheckCircle size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase">Status</p>
                                        <p className="font-bold text-gray-900 dark:text-white">Package Delivered</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Decorative Patterns */}
                        <div className="absolute top-10 -right-10 w-40 h-40 bg-stripes-gray opacity-20 transform rotate-45"></div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DeliveryStats;
