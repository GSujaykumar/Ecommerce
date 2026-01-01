import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../api'
import Reviews from './Reviews'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductOverview() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    };
    if (id) getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (!product) {
    return <div className="text-center py-20 text-xl">Product not found</div>
  }

  // Enriching API data with mock data for UI completeness
  const displayProduct = {
    ...product,
    breadcrumbs: [
      { id: 1, name: 'Shop', href: '/' },
      { id: 2, name: product.category, href: '#' },
    ],
    images: [
      { src: product.image, alt: product.title },
      { src: product.image, alt: product.title }, // Duplicate for gallery effect
      { src: product.image, alt: product.title },
      { src: product.image, alt: product.title },
    ],
    colors: [
      { id: 'white', name: 'White', classes: 'bg-white checked:outline-gray-400' },
      { id: 'gray', name: 'Gray', classes: 'bg-gray-200 checked:outline-gray-400' },
      { id: 'black', name: 'Black', classes: 'bg-gray-900 checked:outline-gray-900' },
    ],
    sizes: [
      { name: 'XXS', inStock: false },
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true },
      { name: '2XL', inStock: true },
      { name: '3XL', inStock: true },
    ],
    details: product.description,
    highlights: [
      'Premium quality material',
      'Ethically sourced',
      'Durable and long-lasting',
      'Modern fit'
    ]
  };

  const reviewAverage = product.rating?.rate || 4;
  const reviewCount = product.rating?.count || 100;

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="pt-6 pb-16 sm:pb-24">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {displayProduct.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300 hover:text-indigo-600">
                    <span className="capitalize">{breadcrumb.name}</span>
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href="#" aria-current="page" className="font-medium text-gray-500 dark:text-gray-400 hover:text-gray-600 line-clamp-1">
                {displayProduct.title}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
          <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block ">
            <img
              alt={displayProduct.images[0].alt}
              src={displayProduct.images[0].src}
              className="h-full w-full object-contain object-center bg-white p-4"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                alt={displayProduct.images[1].alt}
                src={displayProduct.images[1].src}
                className="h-full w-full object-contain object-center bg-white p-4"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                alt={displayProduct.images[2].alt}
                src={displayProduct.images[2].src}
                className="h-full w-full object-contain object-center bg-white p-4"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
            <img
              alt={displayProduct.images[3].alt}
              src={displayProduct.images[3].src}
              className="h-full w-full object-contain object-center bg-white p-4"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 dark:lg:border-gray-700 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">{displayProduct.title}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900 dark:text-white">${displayProduct.price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviewAverage > rating ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-700',
                        'size-5 shrink-0',
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{reviewAverage} out of 5 stars</p>
                <a href="#reviews" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  {reviewCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Color</h3>
                <fieldset aria-label="Choose a color" className="mt-4">
                  <div className="flex items-center gap-x-3">
                    {displayProduct.colors.map((color) => (
                      <div key={color.id} className="flex rounded-full outline -outline-offset-1 outline-black/10 dark:outline-white/20">
                        <input
                          defaultValue={color.id}
                          defaultChecked={color === displayProduct.colors[0]}
                          name="color"
                          type="radio"
                          aria-label={color.name}
                          className={classNames(
                            color.classes,
                            'size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3 cursor-pointer',
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    Size guide
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <div className="grid grid-cols-4 gap-3">
                    {displayProduct.sizes.map((size) => (
                      <label
                        key={size.id}
                        aria-label={size.name}
                        className={classNames(
                          size.inStock ? 'cursor-pointer bg-white text-gray-900 shadow-sm' : 'cursor-not-allowed bg-gray-50 text-gray-200',
                          'group relative flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 has-checked:border-indigo-600 dark:has-checked:border-indigo-400 has-checked:ring-2 has-checked:ring-indigo-600 dark:has-checked:ring-indigo-400'
                        )}
                      >
                        <input
                          defaultValue={size.id}
                          name="size"
                          type="radio"
                          disabled={!size.inStock}
                          className="absolute inset-0 appearance-none focus:outline-none"
                        />
                        <span className={classNames(
                          size.inStock ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600',
                          'text-sm font-medium uppercase'
                        )}>
                          {size.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 dark:lg:border-gray-700 lg:pt-6 lg:pr-8 lg:pb-16">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900 dark:text-gray-300">{displayProduct.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Highlights</h3>
              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {displayProduct.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900 dark:text-white">Details</h2>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600 dark:text-gray-300">{displayProduct.details}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mt-12" id="reviews">
          <Reviews />
        </div>

      </div>
    </div>
  )
}
