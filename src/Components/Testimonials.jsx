import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

const testimonials = [
    {
        id: 1,
        name: "Alex Johnson",
        role: "Verified Buyer",
        content: "The quality of the products is outstanding. I've ordered twice and shipping was incredibly fast!",
        rating: 5
    },
    {
        id: 2,
        name: "Sarah Williams",
        role: "Regular Customer",
        content: "Customer support was very helpful when I needed to exchange a size. Highly recommended shop.",
        rating: 5
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Tech Enthusiast",
        content: "Great prices for the tech gadgets. The dark mode on the site makes shopping at night so easy.",
        rating: 4
    }
];

export default function Testimonials() {
    return (
        <section className="py-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        What our customers say
                    </h2>
                    <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                        Trusted by thousands of happy shoppers worldwide.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-center mb-6">
                                <FaUserCircle className="text-4xl text-gray-400 dark:text-gray-500" />
                                <div className="ml-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                                </div>
                            </div>

                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <AiFillStar
                                        key={i}
                                        className={`text-lg ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
                                    />
                                ))}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.content}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
