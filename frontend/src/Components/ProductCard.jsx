
import { useContext } from "react";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { useQuickView } from "../Context/QuickViewContext";
import { formatPrice } from "../utils";

function ProductCard({ product }) {
  const { addToCart, toggleFavorite, favoriteItems } = useContext(ShopContext);
  const { openQuickView } = useQuickView();

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

      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-white dark:bg-gray-800">
        <div className="absolute inset-0 bg-gray-50/20 mix-blend-multiply dark:hidden"></div>
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <button
            onClick={(e) => { e.preventDefault(); openQuickView(product); }}
            className="bg-white/95 dark:bg-gray-900/95 backdrop-blur shadow-lg text-gray-900 dark:text-white px-6 py-2.5 rounded-full text-sm font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2"
          >
            <FiEye className="text-indigo-600" /> Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow bg-white dark:bg-[#0b0f19]">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-medium text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] line-clamp-2 min-h-[3rem] hover:text-indigo-600 transition">
            {product.title}
          </h3>
        </Link>

        {/* ... Rest of card content ... */}

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
