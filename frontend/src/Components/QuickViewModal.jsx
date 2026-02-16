import React, { useContext } from 'react';
import { useQuickView } from '../Context/QuickViewContext';
import { ShopContext } from '../Context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiShoppingCart, FiStar } from 'react-icons/fi';
import { formatPrice } from '../utils';

const QuickViewModal = () => {
    const { selectedProduct, closeQuickView } = useQuickView();
    const { addToCart } = useContext(ShopContext);

    if (!selectedProduct) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeQuickView}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                ></motion.div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-4xl bg-white dark:bg-[#121212] rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
                >
                    <button
                        onClick={closeQuickView}
                        className="absolute top-4 right-4 z-10 p-2 bg-white/50 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black transition backdrop-blur-md"
                    >
                        <FiX size={20} className="dark:text-white" />
                    </button>

                    {/* Image Side */}
                    <div className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-12 relative overflow-hidden group">
                        <motion.div
                            className="absolute -inset-10 bg-gradient-to-tr from-indigo-500/20 to-purple-500/0 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700"
                        ></motion.div>
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.title}
                            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal relative z-10"
                        />
                    </div>

                    {/* Details Side */}
                    <div className="p-10 flex flex-col justify-center">
                        <div className="mb-2">
                            <span className="text-indigo-600 font-bold text-xs uppercase tracking-wide bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full">
                                {selectedProduct.category}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                            {selectedProduct.title}
                        </h2>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-yellow-400">
                                {[...Array(4)].map((_, i) => <FiStar key={i} className="fill-current" />)}
                                <FiStar className="text-gray-300 dark:text-gray-600" />
                            </div>
                            <span className="text-sm text-gray-500 font-medium">(128 Reviews)</span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed line-clamp-3">
                            {selectedProduct.description}
                        </p>

                        <div className="mt-auto">
                            <div className="flex items-end gap-4 mb-8">
                                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                                    {formatPrice(selectedProduct.price)}
                                </span>
                                <span className="text-lg text-gray-400 line-through mb-1">
                                    {formatPrice(selectedProduct.price * 1.3)}
                                </span>
                            </div>

                            <button
                                onClick={() => { addToCart(selectedProduct); closeQuickView(); }}
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                <FiShoppingCart size={20} /> Add to Cart
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default QuickViewModal;
