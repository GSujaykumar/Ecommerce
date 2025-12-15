import React from 'react'

function Categoriesection() {
    return (
        <div>
            <section className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Section Title */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Shop by Category
                        </h2>
                        <p className="mt-3 text-gray-500">
                            Explore collections crafted for every style
                        </p>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                        {/* Category Card */}
                        <div className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer">
                            <img
                                src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg"
                                alt="Men"
                                className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-white text-2xl font-semibold">Men</h3>
                                <p className="text-gray-200 text-sm mt-1">Premium Wear</p>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer">
                            <img
                                src="https://images.pexels.com/photos/5705475/pexels-photo-5705475.jpeg"
                                alt="Women"
                                className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-white text-2xl font-semibold">Women</h3>
                                <p className="text-gray-200 text-sm mt-1">Elegant Styles</p>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer">
                            <img
                                src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
                                alt="Shoes"
                                className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-white text-2xl font-semibold">Shoes</h3>
                                <p className="text-gray-200 text-sm mt-1">Comfort & Style</p>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer">
                            <img
                                src="https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg"
                                alt="Accessories"
                                className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-white text-2xl font-semibold">Accessories</h3>
                                <p className="text-gray-200 text-sm mt-1">Complete Your Look</p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

        </div>
    )
}

export default Categoriesection
