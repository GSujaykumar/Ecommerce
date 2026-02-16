
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
        images: []
    },
    {
        id: 2,
        author: 'Hector Gibbons',
        rating: 4,
        date: 'Dec 20, 2024',
        title: 'Good buy',
        content: 'Overall good product, but the delivery took a bit longer than expected. The packaging was nice though.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        images: []
    },
    {
        id: 3,
        author: 'Mark Edwards',
        rating: 5,
        date: 'Dec 15, 2024',
        title: 'Exceeded Expectations',
        content: 'I was skeptical at first, but this product is amazing. The color is exactly as shown in the pictures.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        images: ['https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=200']
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Reviews({ extraReviews = [] }) {
    // Combine new reviews with dummy reviews
    const allReviews = [...extraReviews, ...dummyReviews];

    return (
        <div className="bg-white dark:bg-gray-900 py-12 px-6 sm:px-8 lg:px-12 shadow-sm rounded-3xl mt-8">
            <div className="max-w-2xl mx-auto lg:max-w-7xl">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
                    Customer Reviews <span className="text-gray-500 text-lg font-normal ml-2">({allReviews.length})</span>
                </h2>

                <div className="space-y-12">
                    {allReviews.map((review, idx) => (
                        <div key={review.id || idx} className="flex flex-col sm:flex-row gap-6 border-b border-gray-200 dark:border-gray-800 pb-10 last:border-0">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-14 w-14 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
                                    src={review.avatar || "https://ui-avatars.com/api/?name=User&background=random"}
                                    alt={`${review.author}'s avatar`}
                                />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">{review.author}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
                                </div>

                                <div className="flex items-center mt-1 mb-2">
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
                                    {review.verified && (
                                        <span className="ml-4 text-xs font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            Verified Purchase
                                        </span>
                                    )}
                                </div>

                                {review.title && <h4 className="text-base font-bold text-gray-900 dark:text-white mt-2">{review.title}</h4>}

                                <p className="mt-2 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {review.content}
                                </p>

                                {/* Review Images Gallery */}
                                {review.images && review.images.length > 0 && (
                                    <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                                        {review.images.map((img, i) => (
                                            <img
                                                key={i}
                                                src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                                                alt="Review attachment"
                                                className="h-24 w-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:opacity-80 transition"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
