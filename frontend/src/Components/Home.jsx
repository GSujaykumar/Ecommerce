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
import Testimonials from "./Testimonials";
import FlashSale from "./FlashSale";


import DeliveryStats from "./DeliveryStats";



const Home = () => {
    return (
        <div>
            <HeroSection />
            <FlashSale />
            <DeliveryStats />
            <Categoriesection />
            <FeaturedProducts />
            <PromoSection />
            <DiscountSection />

            <PromoBanner />
            <Testimonials />
            <Texttype />
        </div>
    );
};

export default Home;
