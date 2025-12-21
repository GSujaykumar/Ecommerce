import React from "react";
import Categoriesection from "./Categoriesection";
import HeroSection from "./Herosection";
import ProductCard from "./ProductCard";
import FeaturedProducts from "./FeaturedProducts";
import PromoBanner from "./PromoBanner";
import Checkout from "./Checkout";
import Texttype from "./Texttype";



const Home = () => {
    return (
        <div>
            <HeroSection />
            {/* <Categoriesection /> */}
            <ProductCard    />
            <FeaturedProducts />
            <PromoBanner    />
            <Texttype    />
            {/* <Checkout    /> */}
        </div>
    );
};

export default Home;
