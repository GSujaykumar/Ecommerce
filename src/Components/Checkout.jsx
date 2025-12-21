import React from "react";

export default function Checkout() {
    return (
        <div className="min-h-screen bg-[#f6f7fb] py-14">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 px-6">

                {/* LEFT SECTION */}
                <div className="lg:col-span-7 space-y-10">

                    {/* CONTACT */}
                    <section className="bg-white rounded-2xl border border-gray-200 p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Contact information
                        </h2>

                        <input
                            type="email"
                            placeholder="Email address"
                            className="premium-input"
                        />
                    </section>

                    {/* SHIPPING */}
                    <section className="bg-white rounded-2xl border border-gray-200 p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Shipping information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="premium-input" placeholder="First name" />
                            <input className="premium-input" placeholder="Last name" />
                        </div>

                        <input className="premium-input mt-4" placeholder="Company" />
                        <input className="premium-input mt-4" placeholder="Address" />
                        <input className="premium-input mt-4" placeholder="Apartment, suite, etc." />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <input className="premium-input" placeholder="City" />
                            <select className="premium-input">
                                <option>United States</option>
                                <option>India</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <input className="premium-input" placeholder="State / Province" />
                            <input className="premium-input" placeholder="Postal code" />
                        </div>

                        <input className="premium-input mt-4" placeholder="Phone" />
                    </section>

                    {/* DELIVERY */}
                    <section className="bg-white rounded-2xl border border-gray-200 p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Delivery method
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="delivery-card active">
                                <div>
                                    <p className="font-medium">Standard</p>
                                    <p className="text-sm text-gray-500">
                                        4–10 business days
                                    </p>
                                </div>
                                <p className="font-semibold">$5.00</p>
                            </div>

                            <div className="delivery-card">
                                <div>
                                    <p className="font-medium">Express</p>
                                    <p className="text-sm text-gray-500">
                                        2–5 business days
                                    </p>
                                </div>
                                <p className="font-semibold">$16.00</p>
                            </div>
                        </div>
                    </section>

                    {/* PAYMENT */}
                    <section className="bg-white rounded-2xl border border-gray-200 p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Payment
                        </h2>

                        <div className="flex gap-8 mb-6 text-sm">
                            <label className="flex items-center gap-2">
                                <input type="radio" checked />
                                Credit card
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" />
                                PayPal
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" />
                                eTransfer
                            </label>
                        </div>

                        <input className="premium-input mb-4" placeholder="Card number" />
                        <input className="premium-input mb-4" placeholder="Name on card" />

                        <div className="grid grid-cols-2 gap-4">
                            <input className="premium-input" placeholder="MM / YY" />
                            <input className="premium-input" placeholder="CVC" />
                        </div>
                    </section>
                </div>

        
                {/* RIGHT SECTION – SUMMARY */}
                <div className="lg:col-span-5">
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 sticky top-10">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Order summary
                            </h2>
                            <span className="text-sm text-indigo-600 font-medium cursor-pointer">
                                Edit cart
                            </span>
                        </div>

                        {/* PRODUCTS */}
                        {[1, 2].map((i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 py-5 border-b border-gray-100"
                            >
                                <div className="relative">
                                    <img
                                        src="https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg"
                                        className="w-16 h-16 rounded-xl object-cover bg-gray-100"
                                        alt=""
                                    />
                                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                                        1
                                    </span>
                                </div>

                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">
                                        Basic Tee
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Black • Large
                                    </p>
                                </div>

                                <p className="font-medium text-gray-900">
                                    $32.00
                                </p>
                            </div>
                        ))}

                        {/* PRICE DETAILS */}
                        <div className="pt-6 space-y-4 text-sm text-gray-700">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span>$64.00</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Shipping</span>
                                <span>$5.00</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Taxes</span>
                                <span>$5.52</span>
                            </div>
                        </div>

                        {/* TOTAL */}
                        <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    $75.52
                                </p>
                            </div>

                            <span className="text-xs text-gray-500">
                                USD
                            </span>
                        </div>

                        {/* CONFIRM BUTTON */}
                        <button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white py-4 rounded-2xl text-base font-semibold transition-all shadow-lg shadow-indigo-200">
                            Confirm order
                        </button>

                        {/* SECURITY NOTE */}
                        <p className="text-xs text-gray-400 text-center mt-4">
                            🔒 Secure checkout · 256-bit SSL encryption
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
