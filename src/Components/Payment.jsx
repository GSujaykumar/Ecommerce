import React, { useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Public test key

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { cartItems, clearCart, addOrder } = useContext(ShopContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
    const navigate = useNavigate();

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) return;

        // Simulate payment delay
        setTimeout(async () => {
            const cardElement = elements.getElement(CardElement);
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                setError(error.message);
                setLoading(false);
            } else {
                console.log('Payment Success:', paymentMethod);

                // Save Order
                const newOrder = {
                    id: `ORD-${Math.floor(Math.random() * 1000000)}`,
                    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                    total: `$${total.toFixed(2)}`,
                    status: 'Processing',
                    items: cartItems.map(item => ({
                        name: item.title,
                        price: `$${item.price}`,
                        image: item.image,
                        quantity: item.quantity
                    }))
                };
                addOrder(newOrder);

                clearCart();
                setLoading(false);
                alert("Payment Successful! Order placed.");
                navigate('/order-history');
            }
        }, 2000);
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold dark:text-white">Your Cart is Empty</h2>
                <button onClick={() => navigate('/')} className="mt-4 text-indigo-600 hover:underline">Go Shopping</button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
                {['Shipping', 'Payment', 'Review'].map((s, i) => (
                    <div key={s} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${i + 1 <= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            {i + 1}
                        </div>
                        <span className="text-xs mt-1 text-gray-500">{s}</span>
                    </div>
                ))}
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order Summary</h3>
                <p className="text-gray-500 dark:text-gray-400">Total: ${total.toFixed(2)}</p>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Details</label>
                    <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <CardElement options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': { color: '#aab7c4' },
                                },
                                invalid: { color: '#9e2146' },
                            },
                        }} />
                    </div>
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all"
                >
                    {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </button>
            </form>
        </div>
    );
};

export default function Payment() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
}
