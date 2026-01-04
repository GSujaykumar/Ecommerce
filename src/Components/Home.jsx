import React from "react";
import Categoriesection from "./Categoriesection";
import HeroSection from "./Herosection";
import ProductCard from "./ProductCard";
import FeaturedProducts from "./FeaturedProducts";
import PromoBanner from "./PromoBanner";
import PromoSection from "./PromoSection";
import Checkout from "./Checkout";
import Texttype from "./Texttype";
import DiscountSection from "./DiscountSection";



const Home = () => {
    return (
        <div>
            <HeroSection />
            {/* <Categoriesection /> */}
            <FeaturedProducts />
            <PromoSection />
            <DiscountSection />
            <PromoBanner />
            <Texttype />
            {/* <Checkout    /> */}
        </div>
    );
};

export default Home;
