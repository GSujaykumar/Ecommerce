import React from "react";
import Categoriesection from "./Categoriesection";
import HeroSection from "./Herosection";
import ProductCard from "./ProductCard";
import FeaturedProducts from "./FeaturedProducts";
import PromoBanner from "./PromoBanner";



const Home = () => {
    return (
        <div>
            <HeroSection />
            <Categoriesection />
            <ProductCard    />
            <FeaturedProducts />
            <PromoBanner    />
        </div>
    );
};

export default Home;
