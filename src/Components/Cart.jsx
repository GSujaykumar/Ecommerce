
import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils";
import { FiX, FiShoppingBag, FiTrash2 } from "react-icons/fi";

function Cart() {
  const { cartItems, removeFromCart, isCartOpen, setIsCartOpen } = useContext(ShopContext);
  const navigate = useNavigate();

  const subtotalUSD = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Free shipping threshold (e.g., $100 USD approx ₹8300)
  const freeShippingThreshold = 100;
  const progress = Math.min((subtotalUSD / freeShippingThreshold) * 100, 100);

  return (
    <div className={`relative z-[60] ${isCartOpen ? '' : 'hidden'}`} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            {/* Slide-over panel */}
            <div className="pointer-events-auto w-screen max-w-md transform transition duration-500 sm:duration-700">
              <div className="flex h-full flex-col overflow-y-scroll bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] shadow-2xl">

                {/* Header */}
                <div className="flex items-start justify-between px-4 py-6 sm:px-6 border-b border-gray-100 dark:border-gray-800">
                  <h2 className="text-xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]" id="slide-over-title">
                    Shopping Cart ({cartItems.length})
                  </h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setIsCartOpen(false)}
                    >
                      <FiX size={24} />
                    </button>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {cartItems.length > 0 && (
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                      {progress < 100 ? (
                        <>Spend <b>{formatPrice(freeShippingThreshold - subtotalUSD)}</b> more for Free Shipping</>
                      ) : (
                        <span className="text-green-600">You've unlocked Free Shipping!</span>
                      )}
                    </p>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                )}

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="mt-2">
                    <div className="flow-root">
                      {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center mt-20">
                          <div className="h-24 w-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                            <FiShoppingBag size={40} className="text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your cart is empty</h3>
                          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto">
                            Looks like you haven't added anything to your cart yet.
                          </p>
                          <button
                            onClick={() => setIsCartOpen(false)}
                            className="mt-8 px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:opacity-90 transition"
                          >
                            Start Shopping
                          </button>
                        </div>
                      ) : (
                        <ul role="list" className="-my-6 divide-y divide-gray-100 dark:divide-gray-800">
                          {cartItems.map((product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-white p-2">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className="size-full object-contain"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]">
                                    <h3 className="line-clamp-2 pr-4 text-sm font-semibold">
                                      <a href="#">{product.title}</a>
                                    </h3>
                                    <p className="ml-4">{formatPrice(product.price)}</p>
                                  </div>
                                  <p className="mt-1 text-xs text-gray-500 capitalize">
                                    {product.selectedColor} / {product.selectedSize || 'M'}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1">
                                    <button className="text-gray-500 hover:text-black dark:hover:text-white px-2">-</button>
                                    <span className="font-medium">{product.quantity}</span>
                                    <button className="text-gray-500 hover:text-black dark:hover:text-white px-2">+</button>
                                  </div>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      onClick={() => removeFromCart(product.id)}
                                      className="font-medium text-red-500 hover:text-red-400 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                    >
                                      <FiTrash2 />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                  <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-6 sm:px-6 bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)]">
                    <div className="flex justify-between text-base font-medium text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] mb-4">
                      <p>Subtotal</p>
                      <p>{formatPrice(subtotalUSD)}</p>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500 text-center mb-6">Tax included. Shipping calculated at checkout.</p>
                    <div className="mt-6">
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          navigate("/payment");
                        }}
                        className="flex w-full items-center justify-center rounded-xl border border-transparent bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition duration-300"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
