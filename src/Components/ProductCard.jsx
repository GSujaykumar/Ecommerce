
import { useContext } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { formatPrice } from "../utils";

function ProductCard({ product }) {
  const { addToCart, toggleFavorite, favoriteItems } = useContext(ShopContext);

  if (!product) return null;

  const isFavorite = favoriteItems.some((item) => item.id === product.id);

  return (
    <div className="group bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] rounded-3xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden relative h-full flex flex-col border border-gray-100 dark:border-gray-800">

      {/* Wishlist */}
      <button
        onClick={() => toggleFavorite(product)}
        className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur p-2 rounded-full shadow-sm hover:scale-110 transition"
      >
        <FiHeart className={`${isFavorite ? 'text-pink-500 fill-pink-500' : 'text-gray-400 dark:text-gray-600'}`} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="overflow-hidden h-72 w-full flex items-center justify-center bg-white p-6 relative">
          <div className="absolute inset-0 bg-gray-50/50 mix-blend-multiply"></div>
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-auto object-contain z-10 group-hover:scale-105 transition duration-500"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow bg-white dark:bg-[#0b0f19]">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-medium text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] line-clamp-2 min-h-[3rem] hover:text-indigo-600 transition">
            {product.title}
          </h3>
        </Link>

        <p className="text-xs text-gray-500 mt-2 capitalize font-medium tracking-wide">
          {product.category}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition border border-gray-200 dark:border-gray-700 hover:bg-black hover:text-white dark:text-gray-300 dark:hover:bg-white dark:hover:text-black"
          >
            <FiShoppingCart />
            Add
          </button>
        </div>
      </div>

    </div>
  );
}

export default ProductCard;
