import React from 'react';
import ProductCard from '../shared/Productcard';

const products = [
  {
    title: "Elegant Handbag",
    price: 59.99,
    image: "https://images.pexels.com/photos/6311641/pexels-photo-6311641.jpeg"
  },
  {
    title: "Stylish Shoes",
    price: 49.99,
    image: "https://images.pexels.com/photos/19090/pexels-photo.jpg"
  },
  {
    title: "Floral Summer Dress",
    price: 39.99,
    image: "https://images.pexels.com/photos/179909/fashion-clothes-woman-woman-fashion-179909.jpeg"
  },
  {
    title: "Casual Denim Jeans",
    price: 34.99,
    image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg"
  },
  {
    title: "Classic Sunglasses",
    price: 19.99,
    image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg"
  },
  {
    title: "Leather Tote Bag",
    price: 69.99,
    image: "https://images.pexels.com/photos/2983461/pexels-photo-2983461.jpeg"
  }
];



const FeaturedProducts = () => {
  return (
    <section className="my-12 px-4">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-900">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
