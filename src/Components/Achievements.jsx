import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiUserCheck, FiTarget, FiTrendingUp } from 'react-icons/fi';

const Achievements = () => {

    // Custom hook-like counter inside component
    const AnimatedCounter = ({ end, duration = 2000 }) => {
        const [count, setCount] = useState(0);
        useEffect(() => {
            let start = 0;
            const increment = end / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }, [end, duration]);
        return count.toLocaleString();
    };

    const achievements = [
        {
            id: 1,
            title: "Successful Deliveries",
            value: 15420,
            icon: <FiPackage className="w-8 h-8" />,
            color: "from-blue-500 to-indigo-600"
        },
        {
            id: 2,
            title: "Happy Loyalists",
            value: 8500,
            icon: <FiUserCheck className="w-8 h-8" />,
            color: "from-green-500 to-emerald-600"
        },
        {
            id: 3,
            title: "Cities Conquered",
            value: 42,
            icon: <FiTarget className="w-8 h-8" />,
            color: "from-red-500 to-pink-600"
        },
        {
            id: 4,
            title: "YOY Growth",
            value: 310,
            suffix: "%",
            icon: <FiTrendingUp className="w-8 h-8" />,
            color: "from-amber-500 to-orange-600"
        },
    ];

    return (
        <section className="py-24 bg-gray-50 dark:bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Our Achievements</h2>
                    <div className="h-1 w-20 bg-red-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-[#0f0f0f] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                {item.icon}
                            </div>

                            <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                                <AnimatedCounter end={item.value} />{item.suffix || "+"}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide text-sm">
                                {item.title}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Crazy Idea: Holographic Card */}
                <div className="mt-24 bg-black rounded-[3rem] relative overflow-hidden p-12 lg:p-24 text-center">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>

                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">"The only limit is your imagination."</h3>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            We are currently experimenting with <span className="text-red-500 font-bold">Drone Delivery</span> in select beta zones. Stay tuned for the future of logistics.
                        </p>
                        <button className="mt-10 px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            Join Beta Waitlist
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
