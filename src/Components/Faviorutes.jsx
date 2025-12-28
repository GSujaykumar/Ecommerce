import React from "react";
import { FiHeart } from "react-icons/fi";

function Faviorutes({ image, title, price, color }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative">
      {/* Product Image */}
      <div className="relative w-full h-64 overflow-hidden rounded-t-3xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* Wishlist Heart */}
        <button className="absolute top-3 right-3 p-3 rounded-full bg-white shadow-lg hover:bg-pink-50 transition-colors duration-300 transform hover:scale-110">
          <FiHeart className="text-pink-500 text-2xl group-hover:text-pink-600 transition-colors duration-300" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{color}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-black bg-indigo-50 px-3 py-1 rounded-full shadow-sm">
            ${price}
          </span>
          <button className="px-5 py-2 btn-primary text-white rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function WishlistPage() {
  
  const favoriteProducts = [
    {
      id: 1,
      title: "Elegant Handbag",
      price: 59.99,
      color: "Beige",
      image:
        "https://images.unsplash.com/photo-1554568218-dbb0b4193414?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Stylish Sneakers",
      price: 79.99,
      color: "White",
      image:
         "https://images.unsplash.com/photo-1554568218-dbb0b4193414?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    },
    {
      id: 3,
      title: "Classic Watch",
      price: 199.99,
      color: "Silver",
      image:
            "https://images.unsplash.com/photo-1554568218-dbb0b4193414?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    },
    {
      id: 4,
      title: "Leather Wallet",
      price: 49.99,
      color: "Brown",
      image:
                   "https://images.unsplash.com/photo-1554568218-dbb0b4193414?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    },
    {
      id: 5,
      title: "Sunglasses",
      price: 29.99,
      color: "Black",
      image:
            "https://images.unsplash.com/photo-1554568218-dbb0b4193414?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">
        Your Wishlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {favoriteProducts.map((product) => (
          <Faviorutes
            key={product.id}
            title={product.title}
            price={product.price}
            color={product.color}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
