
import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const steps = [
    { name: 'Order Placed', description: 'Your order has been received.', status: 'complete', date: 'Dec 29, 10:00 AM' },
    { name: 'Processing', description: 'We are preparing your items.', status: 'complete', date: 'Dec 29, 02:00 PM' },
    { name: 'Shipped', description: 'Your order is on the way.', status: 'current', date: 'Dec 30, 09:00 AM' },
    { name: 'Out for Delivery', description: 'Courier is nearby.', status: 'upcoming', date: 'Expected Dec 31' },
    { name: 'Delivered', description: 'Package delivered.', status: 'upcoming', date: 'Expected Dec 31' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function OrderTracking() {
    const [orderId, setOrderId] = useState('');
    const [isTracking, setIsTracking] = useState(false);

    const handleTrack = (e) => {
        e.preventDefault();
        if (orderId.trim()) setIsTracking(true);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Search Section */}
                <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Track Your Order</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Enter your order ID to see the current status.</p>

                    <form onSubmit={handleTrack} className="flex gap-4">
                        <input
                            type="text"
                            className="block w-full rounded-lg border-0 py-3 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:ring-gray-600 dark:text-white dark:placeholder-gray-400"
                            placeholder="e.g. #ORD-123456"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="flex-none rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                        >
                            Track
                        </button>
                    </form>
                </div>

                {/* Timeline Section */}
                {isTracking && (
                    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden p-8 animate-fade-in-up">
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order {orderId}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Delivery: Dec 31, 2024</p>
                            </div>
                        </div>

                        <nav aria-label="Progress">
                            <ol role="list" className="overflow-hidden">
                                {steps.map((step, stepIdx) => (
                                    <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative')}>
                                        {step.status === 'complete' ? (
                                            <>
                                                {stepIdx !== steps.length - 1 ? (
                                                    <div className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-indigo-600" aria-hidden="true" />
                                                ) : null}
                                                <div className="group relative flex items-start">
                                                    <span className="flex h-9 items-center">
                                                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800 transition">
                                                            <CheckCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                                        </span>
                                                    </span>
                                                    <div className="ml-4 min-w-0 flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <span className="text-sm font-medium text-gray-900 dark:text-white">{step.name}</span>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{step.description}</p>
                                                            </div>
                                                            <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-2">{step.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : step.status === 'current' ? (
                                            <>
                                                {stepIdx !== steps.length - 1 ? (
                                                    <div className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
                                                ) : null}
                                                <div className="group relative flex items-start" aria-current="step">
                                                    <span className="flex h-9 items-center" aria-hidden="true">
                                                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white dark:bg-gray-800">
                                                            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse" />
                                                        </span>
                                                    </span>
                                                    <div className="ml-4 min-w-0 flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{step.name}</span>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{step.description}</p>
                                                            </div>
                                                            <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-2">{step.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {stepIdx !== steps.length - 1 ? (
                                                    <div className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
                                                ) : null}
                                                <div className="group relative flex items-start">
                                                    <span className="flex h-9 items-center" aria-hidden="true">
                                                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 group-hover:border-gray-400">
                                                            <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                                                        </span>
                                                    </span>
                                                    <div className="ml-4 min-w-0 flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{step.name}</span>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{step.description}</p>
                                                            </div>
                                                            <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-2">{step.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}
