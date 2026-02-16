import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StoreMap = () => {
    const locations = [
        { id: 1, name: "Tokyo HQ", x: 85, y: 35, type: "headquarters" },
        { id: 2, name: "New York Hub", x: 28, y: 32, type: "store" },
        { id: 3, name: "London Store", x: 48, y: 25, type: "store" },
        { id: 4, name: "Berlin Hub", x: 52, y: 22, type: "hub" },
        { id: 5, name: "Singapore", x: 78, y: 55, type: "store" },
        { id: 6, name: "Sydney", x: 88, y: 75, type: "hub" },
        { id: 7, name: "Toronto", x: 25, y: 30, type: "store" },
        { id: 8, name: "Dubai", x: 62, y: 40, type: "hub" },
    ];

    const [activeLocation, setActiveLocation] = useState(null);

    return (
        <section className="py-20 relative overflow-hidden bg-white dark:bg-[#060606] border-y border-gray-100 dark:border-gray-900/50">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-red-600 font-mono font-bold tracking-widest text-sm uppercase"
                    >
                        Global Network
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white"
                    >
                        Domination Map
                    </motion.h2>
                    <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Our influence spreads across continents. Find out where the Obito movement is taking root next.
                    </p>
                </div>

                {/* Map Container */}
                <div className="relative w-full aspect-[16/9] bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 group">
                    {/* World Map Background (Abstract) */}
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'invert(1) grayscale(1) contrast(1.2)'
                        }}
                    ></div>

                    {/* Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                    {/* Locations */}
                    {locations.map((loc) => (
                        <motion.div
                            key={loc.id}
                            className="absolute cursor-pointer"
                            style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: Math.random() * 0.5, type: "spring" }}
                            onMouseEnter={() => setActiveLocation(loc.id)}
                            onMouseLeave={() => setActiveLocation(null)}
                        >
                            <div className="relative">
                                {/* Pulse Effect */}
                                <div className={`absolute -inset-3 rounded-full animate-ping opacity-75 ${loc.type === 'headquarters' ? 'bg-red-600' : 'bg-indigo-600'}`}></div>

                                {/* Pin Point */}
                                <div className={`relative h-4 w-4 rounded-full border-2 border-black ${loc.type === 'headquarters' ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]' : 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)]'}`}></div>

                                {/* Tooltip */}
                                {activeLocation === loc.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 bg-black/90 backdrop-blur-md border border-gray-700 text-white p-3 rounded-xl z-20 shadow-xl"
                                    >
                                        <div className="text-xs font-bold uppercase text-gray-400 mb-1">{loc.type}</div>
                                        <div className="font-bold text-lg">{loc.name}</div>
                                        <div className="text-xs text-green-400 mt-1 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Operational
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* Radar Sweep Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-full h-full animate-scan pointer-events-none"></div>
                </div>

                {/* Stats Below Map */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {['North America', 'Europe', 'Asia Pacific', 'Middle East'].map((region) => (
                        <div key={region} className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10 text-center">
                            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Region</div>
                            <div className="font-bold text-gray-900 dark:text-white mt-1">{region}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes scan {
                    0% { transform: translateX(-100%) skewX(-20deg); }
                    100% { transform: translateX(200%) skewX(-20deg); }
                }
                .animate-scan {
                    animation: scan 4s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default StoreMap;
