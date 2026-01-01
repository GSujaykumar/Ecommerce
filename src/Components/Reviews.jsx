
import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';

const dummyReviews = [
    {
        id: 1,
        author: 'Emily Selman',
        rating: 5,
        date: 'Dec 29, 2024',
        title: 'Loved it!',
        content: 'The quality of the material is fantastic. It feels premium and fits perfectly. Highly recommended!',
        avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 2,
        author: 'Hector Gibbons',
        rating: 4,
        date: 'Dec 20, 2024',
        title: 'Good buy',
        content: 'Overall good product, but the delivery took a bit longer than expected. The packaging was nice though.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 3,
        author: 'Mark Edwards',
        rating: 5,
        date: 'Dec 15, 2024',
        title: 'Exceeded Expectations',
        content: 'I was skeptical at first, but this product is amazing. The color is exactly as shown in the pictures.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Reviews() {
    return (
        <div className="bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 shadow-sm rounded-lg mt-8">
            <div className="max-w-2xl mx-auto lg:max-w-7xl">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Customer Reviews</h2>

                <div className="space-y-10">
                    {dummyReviews.map((review) => (
                        <div key={review.id} className="flex flex-col sm:flex-row gap-4 border-b border-gray-200 dark:border-gray-800 pb-8 last:border-0">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
                                    src={review.avatar}
                                    alt={`${review.author}'s avatar`}
                                />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{review.author}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
                                </div>

                                <div className="flex items-center mt-1">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                review.rating > rating ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-700',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>

                                <h4 className="text-sm font-bold text-gray-900 dark:text-white mt-2">{review.title}</h4>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {review.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Write a Review</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Share your thoughts with other customers.</p>
                    <button className="mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all">
                        Write a Review
                    </button>
                </div>
            </div>
        </div>
    );
}
