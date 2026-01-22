import React, { useContext, useState } from 'react';
import { makePaymentApi, placeOrder } from '../api';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils';
import { downloadInvoice } from '../utils/invoiceGenerator';
import { FiLock, FiTruck, FiCreditCard, FiAlertCircle, FiCheckCircle, FiDownload } from 'react-icons/fi';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Public test key

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { cartItems, clearCart, addOrder } = useContext(ShopContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [lastOrder, setLastOrder] = useState(null);

    // Mock Shipping State
    const [shipping, setShipping] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        city: '',
        zip: '',
        country: 'US'
    });

    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingCost = subtotal > 100 ? 0 : 10; // Simple logic
    const total = subtotal + shippingCost;

    const handleInputChange = (e) => {
        setShipping({ ...shipping, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validation for different methods
        if (paymentMethod === 'card') {
            if (!stripe || !elements) {
                setLoading(false);
                return;
            }
        }

        try {
            let paymentResult = {};

            if (paymentMethod === 'card') {
                const cardElement = elements.getElement(CardElement);
                const { error, paymentMethod: pm } = await stripe.createPaymentMethod({
                    type: 'card',
                    card: cardElement,
                    billing_details: {
                        name: shipping.name,
                        email: shipping.email,
                    },
                });
                if (error) {
                    setError(error.message);
                    setLoading(false);
                    return;
                }
                paymentResult = pm;
            } else {
                // Success for UPI / COD
                paymentResult = { id: `MOCK-${paymentMethod.toUpperCase()}-123` };
            }

            console.log('Payment Method Verified:', paymentResult);

            // Place Order (Backend handles inventory check, payment-service call, and Kafka notification)
            const orderNumber = await placeOrder(cartItems, total, shipping.email, shipping.mobile);

            // Update Frontend State
            const newOrder = {
                id: orderNumber,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                total: formatPrice(total),
                status: 'Processing',
                paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : (paymentMethod === 'upi' ? 'UPI' : 'Credit Card'),
                items: cartItems.map(item => ({
                    ...item,
                    priceFormatted: formatPrice(item.price)
                })),
                shippingAddress: shipping
            };

            addOrder(newOrder);
            setLastOrder(newOrder);
            setSuccess(true);
            clearCart();
        } catch (err) {
            console.error('Payment Flow Error:', err);
            setError(err.message || 'An error occurred during order processing.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0 && !success) {
        // ... existing empty state ...

        return (
            <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-6">
                    <FiCreditCard className="text-4xl text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold dark:text-white mb-2">Your Cart is Empty</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-center">
                    It looks like you haven't added any items to your cart properly to checkout.
                </p>
                <button onClick={() => navigate('/')} className="btn-primary">
                    Return to Shop
                </button>
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full mb-6 animate-bounce">
                    <FiCheckCircle className="text-5xl text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Payment Successful!</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                    Thank you for your order, {shipping.name}. A confirmation email has been sent to {shipping.email}.
                </p>
                <div className="flex gap-4 mt-6">
                    <button onClick={() => navigate('/order-history')} className="btn-primary">
                        View My Order
                    </button>
                    <button
                        onClick={() => {
                            if (lastOrder) {
                                downloadInvoice(lastOrder);
                            }
                        }}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                        <FiDownload /> Download Invoice
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">Checkout</h1>

            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">

                {/* Left Column: Forms */}
                <div className="lg:col-span-7">
                    <form onSubmit={handlePayment}>
                        {/* Contact & Shipping */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-bold">1</span>
                                Shipping Information
                            </h2>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                    <input type="text" id="name" name="name" required value={shipping.name} onChange={handleInputChange} className="premium-input" placeholder="John Doe" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                    <input type="email" id="email" name="email" required value={shipping.email} onChange={handleInputChange} className="premium-input" placeholder="john@example.com" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
                                    <input type="tel" id="mobile" name="mobile" required value={shipping.mobile} onChange={handleInputChange} className="premium-input" placeholder="+1 (555) 000-0000" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                                    <input type="text" id="address" name="address" required value={shipping.address} onChange={handleInputChange} className="premium-input" placeholder="123 Main St" />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                                    <input type="text" id="city" name="city" required value={shipping.city} onChange={handleInputChange} className="premium-input" placeholder="New York" />
                                </div>
                                <div>
                                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Postal Code</label>
                                    <input type="text" id="zip" name="zip" required value={shipping.zip} onChange={handleInputChange} className="premium-input" placeholder="10001" />
                                </div>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8 transition-all">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-bold">2</span>
                                Payment Method
                            </h2>

                            {/* Payment Tabs */}
                            <div className="flex gap-4 mb-6 border-b border-gray-100 dark:border-gray-700 pb-2 overflow-x-auto">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    className={`pb-2 px-1 text-sm font-medium transition whitespace-nowrap ${paymentMethod === 'card' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Credit/Debit Card
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('upi')}
                                    className={`pb-2 px-1 text-sm font-medium transition whitespace-nowrap ${paymentMethod === 'upi' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    UPI / NetBanking
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('cod')}
                                    className={`pb-2 px-1 text-sm font-medium transition whitespace-nowrap ${paymentMethod === 'cod' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Cash on Delivery
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('wallet')}
                                    className={`pb-2 px-1 text-sm font-medium transition whitespace-nowrap ${paymentMethod === 'wallet' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Wallet / QR
                                </button>
                            </div>

                            <div className="min-h-[200px]">
                                {paymentMethod === 'card' && (
                                    <div className="animate-fadeIn">
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Card Information</label>
                                            <div className="flex gap-2">
                                                <span className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-full font-medium">Secure</span>
                                                <span className="text-xs bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full font-medium">Encrypted</span>
                                            </div>
                                        </div>
                                        <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white transition focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 shadow-sm">
                                            <CardElement options={{
                                                style: {
                                                    base: {
                                                        fontSize: '16px',
                                                        color: '#1f2937',
                                                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                                                        '::placeholder': { color: '#9ca3af' },
                                                        iconColor: '#6366f1'
                                                    },
                                                    invalid: {
                                                        color: '#ef4444',
                                                        iconColor: '#ef4444'
                                                    }
                                                },
                                                hidePostalCode: true
                                            }} />
                                        </div>
                                        <div className="mt-4 flex items-center gap-2">
                                            <input type="checkbox" id="save-card" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900" />
                                            <label htmlFor="save-card" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none">Save this card for faster payments</label>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'upi' && (
                                    <div className="animate-fadeIn space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">UPI ID / VPA</label>
                                            <input type="text" className="premium-input" placeholder="username@upi" />
                                        </div>
                                        <p className="text-xs text-gray-500">Enter your UPI ID to receive a payment request on your app.</p>
                                    </div>
                                )}

                                {paymentMethod === 'cod' && (
                                    <div className="animate-fadeIn flex flex-col items-center justify-center text-center p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                                            <FiTruck className="text-2xl text-green-600 dark:text-green-400" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Pay on Delivery</h3>
                                        <p className="text-sm text-gray-500 mt-2 max-w-xs">Pay securely with cash or UPI when our delivery partner arrives at your doorstep.</p>
                                    </div>
                                )}

                                {paymentMethod === 'wallet' && (
                                    <div className="animate-fadeIn space-y-6">
                                        <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Scan QR to Pay</h3>
                                            <div className="p-3 bg-white rounded-lg shadow-md border border-gray-100">
                                                {/* Simulated QR Code */}
                                                <img
                                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=obitostore@upi&pn=ObitoStore&am=${total}&cu=INR`}
                                                    alt="Payment QR Code"
                                                    className="w-40 h-40"
                                                />
                                            </div>
                                            <p className="mt-4 text-xs text-center text-gray-500">
                                                Scan with any UPI app (GPay, PhonePe, Paytm) <br />
                                                to pay <span className="font-bold text-gray-900 dark:text-gray-200">{formatPrice(total)}</span>
                                            </p>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-white dark:bg-gray-800 px-2 text-sm text-gray-400">Or pay with Wallet</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button type="button" className="flex-1 py-3 px-4 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                                <span className="font-medium text-sm text-gray-700 dark:text-gray-200">Apple Pay</span>
                                            </button>
                                            <button type="button" className="flex-1 py-3 px-4 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                                <span className="font-medium text-sm text-gray-700 dark:text-gray-200">Google Pay</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {error && (
                                <div className="mt-4 rounded-md bg-red-50 dark:bg-red-900/20 p-4 mb-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <FiAlertCircle className="h-5 w-5 text-red-400" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{error}</h3>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    disabled={loading || (paymentMethod === 'card' && !stripe)}
                                    className="w-full flex items-center justify-center rounded-xl border border-transparent bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-all transform active:scale-[0.99]"
                                >
                                    <FiLock className="mr-2" />
                                    {loading ? 'Processing...' : (paymentMethod === 'cod' ? `Place Order • ${formatPrice(total)}` : `Pay ${formatPrice(total)}`)}
                                </button>

                                <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                                    <FiLock size={12} /> Payments are secure and encrypted.
                                </p>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right Column: Order Summary */}
                <div className="mt-10 lg:mt-0 lg:col-span-5">
                    <div className="sticky top-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Order Summary</h2>
                        </div>

                        <div className="px-6 py-4 max-h-[400px] overflow-y-auto">
                            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="flex py-4">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-600 bg-white">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-full w-full object-contain object-center p-1"
                                            />
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                    <h3 className="line-clamp-1 mr-2">{item.title}</h3>
                                                    <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500 dark:text-gray-400">Qty {item.quantity}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-700 px-6 py-6 bg-gray-50 dark:bg-gray-900/30">
                            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                <p>Subtotal</p>
                                <p>{formatPrice(subtotal)}</p>
                            </div>
                            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                                <p className="flex items-center gap-1"><FiTruck /> Shipping</p>
                                <p>{shippingCost === 0 ? <span className="text-green-600">Free</span> : formatPrice(shippingCost)}</p>
                            </div>
                            <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white pt-4 border-t border-gray-200 dark:border-gray-700">
                                <p>Total</p>
                                <p className="text-xl text-indigo-600 dark:text-indigo-400">{formatPrice(total)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Payment() {
    return (
        <div className="min-h-screen bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] pt-24 pb-12 transition-colors duration-300">
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
}

