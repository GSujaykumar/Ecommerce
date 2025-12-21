import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

function ProductCard() {
  return (
    <Link to="/product/1">
      <div className="group bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden relative ">

        {/* Wishlist */}
        <button className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition">
          <FiHeart className="text-gray-700" />
        </button>

        {/* Image */}
        <div className="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
            alt="Product"
            className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold  text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-primary)]">
            Premium Leather Jacket
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Modern • Stylish • Durable
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-black-500">
              ₹4,999
            </span>

            <button className="flex items-center gap-2 px-4 py-2 rounded-full  text-sm font-semibold transition border border-[var(--color-text-secondary)] dark:border-[var(--color-dark-text-secondary)] hover:bg-[var(--color-text-secondary)] dark:hover:bg-[var(--color-dark-text-secondary)] hover:text-white dark:text-[var(--color-dark-text-secondary)]">
              <FiShoppingCart />
              Add
            </button>
          </div>
        </div>

      </div>
    </Link>
  );
}

export default ProductCard;
