import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { placeOrder } from "../api";
import toast, { Toaster } from 'react-hot-toast';

export default function Checkout() {
    const { cartItems, clearCart, addOrder } = useContext(ShopContext);
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    // ... rest of imports/state ...
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zip: "",
        country: "United States"
    });

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 5.00;
    const taxes = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + taxes;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConfirmOrder = async () => {
        setIsProcessing(true);
        try {
            // 1. Call Backend API
            const orderId = await placeOrder(cartItems, total);

            // 2. Create Order Object for Frontend State (and Invoice)
            const newOrder = {
                id: orderId,
                date: new Date().toLocaleDateString(),
                total: `$${total.toFixed(2)}`,
                status: 'Processing',
                paymentMethod: 'Credit Card', // Mock
                shippingAddress: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    address: formData.address,
                    city: formData.city,
                    zip: formData.zip,
                    email: formData.email
                },
                items: cartItems.map(item => ({
                    id: item.id || item.skuCode,
                    title: item.title || item.productName,
                    price: item.price,
                    priceFormatted: `$${item.price.toFixed(2)}`,
                    quantity: item.quantity,
                    image: item.image || item.imageUrl
                }))
            };

            // 3. Update Local Context
            addOrder(newOrder); // Adds to Order History
            clearCart();

            // 4. Navigate to Order History
            toast.success('Order placed successfully!');
            setTimeout(() => {
                navigate('/orders');
            }, 1000);
        } catch (error) {
            console.error("Order failed:", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
                    <p className="mt-2 text-gray-500">Add some products before checking out.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Go Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f6f7fb] py-14">
            <Toaster position="top-center" reverseOrder={false} />
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
                            name="email"
                            placeholder="Email address"
                            className="premium-input w-full"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </section>

                    {/* SHIPPING */}
                    <section className="bg-white rounded-2xl border border-gray-200 p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Shipping information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="premium-input" name="firstName" placeholder="First name" onChange={handleInputChange} />
                            <input className="premium-input" name="lastName" placeholder="Last name" onChange={handleInputChange} />
                        </div>

                        <input className="premium-input mt-4 w-full" name="address" placeholder="Address" onChange={handleInputChange} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <input className="premium-input" name="city" placeholder="City" onChange={handleInputChange} />
                            <input className="premium-input" name="zip" placeholder="Postal code" onChange={handleInputChange} />
                        </div>
                    </section>

                    {/* DELIVERY */}
                    <section className="bg-white rounded-2xl border border-gray-200 p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Delivery method
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="delivery-card active cursor-pointer border-2 border-indigo-600 bg-indigo-50 p-4 rounded-xl flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-indigo-900">Standard</p>
                                    <p className="text-sm text-indigo-700">4–10 business days</p>
                                </div>
                                <p className="font-semibold text-indigo-900">$5.00</p>
                            </div>
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
                            <span
                                onClick={() => navigate('/cart')}
                                className="text-sm text-indigo-600 font-medium cursor-pointer hover:underline"
                            >
                                Edit cart
                            </span>
                        </div>

                        {/* PRODUCTS */}
                        <div className="max-h-80 overflow-y-auto pr-2 space-y-4">
                            {cartItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0"
                                >
                                    <div className="relative">
                                        <img
                                            src={item.image || item.imageUrl}
                                            className="w-16 h-16 rounded-xl object-cover bg-gray-100"
                                            alt={item.title}
                                        />
                                        <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                                            {item.quantity}
                                        </span>
                                    </div>

                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 truncate max-w-[150px]">
                                            {item.title || item.productName}
                                        </p>
                                    </div>

                                    <p className="font-medium text-gray-900">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* PRICE DETAILS */}
                        <div className="pt-6 space-y-4 text-sm text-gray-700 border-t border-gray-100 mt-4">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Shipping</span>
                                <span className="font-medium">${shipping.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Taxes</span>
                                <span className="font-medium">${taxes.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* TOTAL */}
                        <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${total.toFixed(2)}
                                </p>
                            </div>

                            <span className="text-xs text-gray-500">
                                USD
                            </span>
                        </div>

                        {/* CONFIRM BUTTON */}
                        <button
                            onClick={handleConfirmOrder}
                            disabled={isProcessing}
                            className={`w-full mt-8 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white py-4 rounded-2xl text-base font-semibold transition-all shadow-lg shadow-indigo-200 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isProcessing ? 'Processing...' : 'Confirm order'}
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

