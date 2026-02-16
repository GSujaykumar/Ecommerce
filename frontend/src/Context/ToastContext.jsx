import React, { createContext, useContext, useState, useCallback } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl transform transition-all duration-300 animate-slide-in
                            ${toast.type === 'success' ? 'bg-black text-white dark:bg-white dark:text-black border border-gray-800' : ''}
                            ${toast.type === 'error' ? 'bg-red-600 text-white' : ''}
                            ${toast.type === 'info' ? 'bg-indigo-600 text-white' : ''}
                        `}
                    >
                        {toast.type === 'success' && <FiCheckCircle className="w-5 h-5 flex-shrink-0 text-green-400 dark:text-green-600" />}
                        {toast.type === 'error' && <FiAlertCircle className="w-5 h-5 flex-shrink-0" />}
                        {toast.type === 'info' && <FiInfo className="w-5 h-5 flex-shrink-0" />}

                        <p className="text-sm font-semibold">{toast.message}</p>

                        <button onClick={() => removeToast(toast.id)} className="ml-4 opacity-70 hover:opacity-100 transition">
                            <FiX className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes slide-in {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </ToastContext.Provider>
    );
};
