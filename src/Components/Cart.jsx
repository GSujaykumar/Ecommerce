import React from "react";

function Cart() {
  return (
    <div>
      <el-dialog>
        <dialog
          id="drawer"
          aria-labelledby="drawer-title"
          className="fixed inset-0 size-auto max-h-none max-w-none overflow-hidden bg-transparent not-open:hidden backdrop:bg-transparent"
        >
          <el-dialog-backdrop className="absolute inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"></el-dialog-backdrop>

          <div tabIndex="0" className="absolute inset-0 pl-10 focus:outline-none sm:pl-16">
            <el-dialog-panel className="ml-auto block size-full max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
              <div className="flex h-full flex-col overflow-y-auto bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)]bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 id="drawer-title" className="text-lg font-medium text-gray-900">Shopping cart</h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        command="close"
                        commandfor="drawer"
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5"></span>
                        <span className="sr-only">Close panel</span>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          data-slot="icon"
                          aria-hidden="true"
                          className="size-6"
                        >
                          <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        <li className="flex py-6">
                          <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                              alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                              className="size-full object-cover"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href="#">Throwback Hip Bag</a>
                                </h3>
                                <p className="ml-4">$90.00</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Salmon</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">Qty 1</p>
                              <div className="flex">
                                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li className="flex py-6">
                          <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                              alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                              className="size-full object-cover"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href="#">Medium Stuff Satchel</a>
                                </h3>
                                <p className="ml-4">$32.00</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Blue</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">Qty 1</p>
                              <div className="flex">
                                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li className="flex py-6">
                          <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-03.jpg"
                              alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls."
                              className="size-full object-cover"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href="#">Zip Tote Basket</a>
                                </h3>
                                <p className="ml-4">$140.00</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">White and black</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">Qty 1</p>
                              <div className="flex">
                                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$262.00</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white btn-primary"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <button type="button" command="close" commandfor="drawer" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </el-dialog-panel>
          </div>
        </dialog>
      </el-dialog>
    </div>
  );
}

export default Cart;
