    import { FiHeart, FiShoppingCart } from "react-icons/fi";

function ProductCard() {
  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden relative">

      {/* Wishlist */}
      <button className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition">
        <FiHeart className="text-gray-700" />
      </button>

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src="https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg"
          alt="Product"
          className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">
          Premium Leather Jacket
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Modern • Stylish • Durable
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-black-500">
            ₹4,999
          </span>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full btn-primary text-white text-sm font-semibold transition">
            <FiShoppingCart />
            Add
          </button>
        </div>
      </div>

    </div>
  );
}

export default ProductCard;
