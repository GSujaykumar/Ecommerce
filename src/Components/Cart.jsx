import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, isCartOpen, setIsCartOpen } = useContext(ShopContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={`relative z-50 ${isCartOpen ? '' : 'hidden'}`} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={() => setIsCartOpen(false)}></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            {/* Slide-over panel */}
            <div className="pointer-events-auto w-screen max-w-md transform transition duration-500 sm:duration-700">
              <div className="flex h-full flex-col overflow-y-scroll bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]" id="slide-over-title">Shopping cart</h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => setIsCartOpen(false)}
                      >
                        <span className="absolute -inset-0.5"></span>
                        <span className="sr-only">Close panel</span>
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
                      ) : (
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cartItems.map((product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className="size-full object-contain p-2"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]">
                                    <h3 className="line-clamp-2 pr-4">
                                      <a href="#">{product.title}</a>
                                    </h3>
                                    <p className="ml-4">${product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500 capitalize">{product.category}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty {product.quantity}</p>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      onClick={() => removeFromCart(product.id)}
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Remove
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

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate("/payment");
                      }}
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <button
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
