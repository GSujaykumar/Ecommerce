import React from 'react';

const ProductCard = ({ image, title, price }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300">
      <img src={image} alt={title} className="w-full h-52 object-cover"/>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-indigo-600 font-bold">${price}</p>
        <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
