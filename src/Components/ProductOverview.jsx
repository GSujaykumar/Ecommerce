import { StarIcon } from '@heroicons/react/20/solid';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api';
import { ShopContext } from '../Context/ShopContext';
import { useToast } from '../Context/ToastContext';
import { FiTruck, FiShield, FiRefreshCw, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Reviews from './Reviews';
import RelatedProducts from './RelatedProducts';

import { ProductPageSkeleton } from './Skeleton';
import { formatPrice } from '../utils';

import { useState, useEffect, useContext } from 'react';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductOverview() {
  const { id } = useParams();
  const { addToCart } = useContext(ShopContext);
  const { addToast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [isDescOpen, setIsDescOpen] = useState(true);

  /* REVIEW STATE */
  const [userReviews, setUserReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    rating: 5,
    content: '',
    images: []
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewReview({ ...newReview, images: [...newReview.images, ...files] });
    addToast(`${files.length} images added`, 'info');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = {
      id: Date.now(),
      author: newReview.name || "Anonymous",
      rating: newReview.rating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      title: "Verified Customer",
      content: newReview.content,
      avatar: `https://ui-avatars.com/api/?name=${newReview.name || 'User'}&background=random`,
      images: newReview.images,
      verified: true
    };
    setUserReviews([review, ...userReviews]);
    setNewReview({ name: '', email: '', rating: 5, content: '', images: [] });
    addToast("Review submitted successfully!", "success");
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
      // Reset state
      setUserReviews([]);

      // Save to Recently Viewed
      if (data) {
        const stored = localStorage.getItem('recentlyViewed');
        let viewed = stored ? JSON.parse(stored) : [];
        // Remove if duplicate exists
        viewed = viewed.filter(p => p.id !== data.id);
        // Add to start
        viewed.unshift({
          id: data.id,
          title: data.title,
          price: data.price,
          image: data.image
        });
        // Limit to 10
        if (viewed.length > 10) viewed.pop();
        localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
      }
    };
    if (id) getProduct();
  }, [id]);

  const checkDelivery = (e) => {
    e.preventDefault();
    // Mock delivery check
    if (pincode.length === 6) {
      setDeliveryStatus({ available: true, date: 'Wednesday, Oct 24' });
      addToast("Delivery available!", "success");
    } else {
      setDeliveryStatus({ available: false, msg: 'Invalid Pincode' });
      addToast("Invalid Pincode", "error");
    }
  };

  if (loading) {
    return (
      <div className="bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] min-h-screen pt-24">
        <ProductPageSkeleton />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  // Normalize product data for template
  const displayProduct = {
    ...product,
    price: product.price || 0,
    images: [{ src: product.image, alt: product.title }, { src: product.image, alt: product.title }, { src: product.image, alt: product.title }, { src: product.image, alt: product.title }], // Mock gallery
    colors: [
      { name: 'black', class: 'bg-black', selectedClass: 'ring-gray-900' },
      { name: 'white', class: 'bg-white', selectedClass: 'ring-gray-400' },
      { name: 'blue', class: 'bg-blue-500', selectedClass: 'ring-blue-500' },
    ],
    sizes: [
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true },
    ],
    description: product.description || "The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options.",
  };

  const reviewCount = 117 + userReviews.length;
  const reviewAverage = 4;

  const handleAddToCart = () => {
    addToCart({ ...displayProduct, selectedSize, selectedColor });
    addToast(`Added ${displayProduct.title} to cart!`, "success");
  };

  const handleWishlist = () => {
    addToast("Added to wishlist!", "info");
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({ title: product.title, text: 'Check out this product on ObitoStore!', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast("Link copied to clipboard!", "success");
    }
  };

  return (
    <div className="bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] transition-colors duration-300 min-h-screen pt-24">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <ol role="list" className="flex items-center space-x-2 text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]">
          <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
          <li>/</li>
          <li><Link to={`/${product.category.toLowerCase()}`} className="capitalize hover:text-indigo-600">{product.category}</Link></li>
          <li>/</li>
          <li className="font-medium text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] truncate max-w-xs">{product.title}</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:grid lg:grid-cols-2 lg:gap-x-12">

        {/* Left: Image Gallery */}
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          {/* Thumbnail Strip (Hidden on mobile) */}
          <div className="hidden lg:flex flex-col gap-4 w-20">
            {displayProduct.images.map((img, idx) => (
              <div key={idx} className="aspect-square rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:border-black dark:hover:border-white transition p-2 bg-white">
                <img src={img.src} alt="Thumbnail" className="w-full h-full object-contain" />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 aspect-[4/5] rounded-2xl overflow-hidden bg-white dark:bg-gray-800 relative border border-gray-100 dark:border-gray-800">
            <img src={displayProduct.images[0].src} alt={displayProduct.title} className="w-full h-full object-contain p-8" />

            {/* Sale Badge */}
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
              Sale
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="mt-10 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]">
            {displayProduct.title}
          </h1>

          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    reviewAverage > rating ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-700',
                    'h-5 w-5 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="ml-3 text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]">
              {reviewCount} Verified Reviews
            </p>
          </div>

          <div className="mt-6 flex items-baseline gap-4">
            <p className="text-4xl font-extrabold text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]">
              {formatPrice(displayProduct.price)}
            </p>
            <p className="text-lg text-gray-500 line-through">
              {formatPrice(displayProduct.price * 1.4)}
            </p>
            <span className="text-green-600 font-semibold text-sm">Include all taxes</span>
          </div>

          {/* Separator */}
          <div className="my-8 border-t border-gray-200 dark:border-gray-800"></div>

          {/* Selectors */}
          <div className="space-y-6">

            {/* Color */}
            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] mb-3">Color: <span className="font-normal capitalize">{selectedColor}</span></h3>
              <div className="flex gap-3">
                {displayProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={classNames(
                      color.class,
                      selectedColor === color.name ? 'ring-2 ring-offset-2 ring-indigo-600 dark:ring-offset-gray-900' : '',
                      'w-10 h-10 rounded-full border border-gray-200 dark:border-gray-600 focus:outline-none'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex justify-between mb-3">
                <h3 className="text-sm font-medium text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]">Select Size</h3>
                <a href="#" className="text-sm text-indigo-600 font-semibold hover:underline">Size Guide</a>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {displayProduct.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    disabled={!size.inStock}
                    className={classNames(
                      selectedSize === size.name
                        ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
                        : 'bg-transparent text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white',
                      'border rounded-lg py-3 text-sm font-medium transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/50 transition-all duration-300"
              >
                Add to Cart
              </button>
              <button onClick={handleWishlist} className="flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent px-8 py-4 text-base font-bold text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                Wishlist
              </button>
            </div>

            {/* Delivery Checker */}
            <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-3 text-sm font-medium text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]">
                <FiTruck />
                <span>Delivery Options</span>
              </div>
              <form onSubmit={checkDelivery} className="relative">
                <input
                  type="text"
                  maxLength="6"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter Pincode"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2.5 pl-4 pr-32 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                />
                <button type="submit" className="absolute right-1 top-1 bottom-1 px-4 text-xs font-bold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-md transition">
                  Check
                </button>
              </form>
              {deliveryStatus && (
                <p className={`text-xs mt-2 font-medium ${deliveryStatus.available ? 'text-green-600' : 'text-red-500'}`}>
                  {deliveryStatus.available ? `Expected delivery by ${deliveryStatus.date}` : deliveryStatus.msg}
                </p>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 text-center mt-6">
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-full">
                  <FiShield className="text-xl text-gray-600 dark:text-gray-300" />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Original</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-full">
                  <FiRefreshCw className="text-xl text-gray-600 dark:text-gray-300" />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">14 Days Returns</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-full">
                  <FiShield className="text-xl text-gray-600 dark:text-gray-300" />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Secure Pay</span>
              </div>
            </div>

            {/* Accordion Info */}
            <div className="mt-8 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setIsDescOpen(!isDescOpen)}
                className="w-full flex justify-between items-center py-4 text-left text-sm font-medium text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]"
              >
                <span>Description & Details</span>
                {isDescOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {isDescOpen && (
                <div className="pb-4 text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] leading-relaxed">
                  {displayProduct.description}
                  <ul className="list-disc pl-5 mt-4 space-y-1">
                    <li>100% Cotton Premium Quality</li>
                    <li>Machine wash cold, tumble dry low</li>
                    <li>Made in India</li>
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Reviews Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 border-t border-gray-200 dark:border-gray-800 pt-16">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Reviews</h3>
            <button
              onClick={shareProduct}
              className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
              Share Product
            </button>
          </div>

          {/* Write Review Form */}
          <div className="bg-white dark:bg-gray-800/40 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm mb-16">
            <h4 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Write a Review</h4>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Rate this product</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setNewReview({ ...newReview, rating: star })} className={`transition-colors transform hover:scale-110 ${newReview.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}>
                      <StarIcon className="h-8 w-8" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Name</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full rounded-xl border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 p-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500 dark:text-white transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Email</label>
                  <input
                    type="email"
                    value={newReview.email}
                    onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 p-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500 dark:text-white transition"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Sort Photos (Optional)</label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer flex items-center justify-center px-4 py-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <span className="text-sm text-indigo-600 font-semibold">+ Upload Images</span>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  <div className="flex gap-2">
                    {newReview.images.map((file, i) => (
                      <img key={i} src={URL.createObjectURL(file)} alt="preview" className="h-12 w-12 rounded-lg object-cover" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Your Review</label>
                <textarea
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  placeholder="Tell us what you liked or disliked..." rows="4"
                  className="w-full rounded-xl border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 p-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500 dark:text-white transition"
                  required
                ></textarea>
              </div>

              <button type="submit" className="w-full md:w-auto px-10 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                Submit Review
              </button>
            </form>
          </div>

          <Reviews extraReviews={userReviews} />

        </div>

        {/* Related Products - Full Width */}
        <div className="col-span-1 lg:col-span-2 mt-16">
          <RelatedProducts currentProductId={product.id} />
        </div>

        {/* Recently Viewed - Full Width */}
        <div className="col-span-1 lg:col-span-2 mt-8">
          <RecentlyViewed />
        </div>

      </div>
    </div >
  );
}
