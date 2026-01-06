import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-normalbg)]/90 dark:bg-[var(--color-darkbg)]/90 backdrop-blur-md transition-all duration-300">
            <div className="flex flex-col items-center">
                {/* Cartoon Bouncing Bag Animation */}
                <div className="relative w-24 h-24 mb-4">
                    <div className="absolute inset-0 flex items-end justify-center animate-bounce-slow">
                        {/* Bag Body */}
                        <div className="w-16 h-14 bg-indigo-600 rounded-b-lg relative shadow-lg">
                            {/* Bag Handle */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 border-4 border-indigo-600 rounded-full border-b-transparent"></div>
                            {/* Eyes */}
                            <div className="absolute top-4 left-3 w-3 h-3 bg-white rounded-full animate-blink"></div>
                            <div className="absolute top-4 right-3 w-3 h-3 bg-white rounded-full animate-blink"></div>
                            {/* Smile */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-white rounded-full"></div>
                        </div>
                    </div>
                    {/* Shadow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/20 rounded-full animate-shadow-pulse"></div>
                </div>

                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 font-display animate-pulse">
                    Loading...
                </h3>
            </div>

            <style>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(2deg); }
                }
                @keyframes shadow-pulse {
                    0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.2; }
                    50% { transform: translateX(-50%) scale(0.6); opacity: 0.1; }
                }
                @keyframes blink {
                    0%, 90%, 100% { transform: scaleY(1); }
                    95% { transform: scaleY(0.1); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 1s infinite ease-in-out;
                }
                .animate-shadow-pulse {
                    animation: shadow-pulse 1s infinite ease-in-out;
                }
                .animate-blink {
                    animation: blink 3s infinite;
                }
            `}</style>
        </div>
    );
};

export default LoadingSpinner;
