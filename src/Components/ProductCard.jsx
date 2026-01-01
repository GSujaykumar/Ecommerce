import { useContext } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

function ProductCard({ product }) {
  const { addToCart, toggleFavorite, favoriteItems } = useContext(ShopContext);

  if (!product) return null;

  const isFavorite = favoriteItems.some((item) => item.id === product.id);

  return (
    <div className="group bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden relative h-full flex flex-col">

      {/* Wishlist */}
      <button
        onClick={() => toggleFavorite(product)}
        className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition"
      >
        <FiHeart className={`${isFavorite ? 'text-pink-500 fill-pink-500' : 'text-gray-700'}`} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="overflow-hidden h-72 w-full flex items-center justify-center bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-auto object-contain p-4 group-hover:scale-110 transition duration-700"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow bg-white dark:bg-gray-800">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-primary)] line-clamp-1 hover:text-indigo-600 transition">
            {product.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mt-1 capitalize">
          {product.category}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-black-500 dark:text-white">
            ${product.price}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition border border-gray-300 hover:bg-black hover:text-white dark:border-gray-600 dark:text-gray-200 dark:hover:bg-white dark:hover:text-black"
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
