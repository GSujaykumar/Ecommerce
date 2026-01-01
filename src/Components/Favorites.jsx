import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

function Favorites() {
  const { favoriteItems } = useContext(ShopContext);

  if (favoriteItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Your wishlist is empty</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Start exploring and save your favorite items here.</p>
        <Link to="/" className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] text-center">
        Your Wishlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {favoriteItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
