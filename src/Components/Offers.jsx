import React from 'react';

const offers = [
  {
    title: "Summer Sale - Up to 50% Off!",
    subtitle: "Grab your favorites before they’re gone.",
    image: "https://images.pexels.com/photos/1166201/pexels-photo-1166201.jpeg",
    cta: "Shop Now"
  },
  {
    title: "Exclusive Bags Collection",
    subtitle: "Trendy bags at premium prices.",
    image: "https://images.pexels.com/photos/6311638/pexels-photo-6311638.jpeg",
    cta: "Explore Now"
  },
  {
    title: "Footwear Fiesta",
    subtitle: "Step into new arrivals.",
    image: "https://images.pexels.com/photos/19090/pexels-photo.jpg",
    cta: "Buy Now"
  }
];


const Offers = () => {
  return (
    <section className="my-12 px-4">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-900">Special Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-6 opacity-0 group-hover:opacity-100 transition duration-500">
              <h3 className="text-white text-2xl font-bold mb-2">{offer.title}</h3>
              <p className="text-white mb-4">{offer.subtitle}</p>
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition">
                {offer.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offers;
