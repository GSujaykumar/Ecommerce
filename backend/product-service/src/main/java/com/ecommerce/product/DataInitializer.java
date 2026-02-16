package com.ecommerce.product;

import com.ecommerce.product.model.Product;
import com.ecommerce.product.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner loadData(ProductRepository productRepository) {
        return args -> {
            List<Product> products = List.of(
                // --- ELECTRONICS (10 PRODUCTS for Flash Sale) ---
                Product.builder().name("MacBook Pro M3").description("Latest Apple Silicon laptop with stunning display.").skuCode("elec_macbook_m3").price(new BigDecimal("1999.99")).imageUrl("https://images.unsplash.com/photo-1517336714460-450d44952af0?auto=format&fit=crop&q=80&w=800").category("electronics").build(),
                Product.builder().name("Sony WH-1000XM5").description("Industry-leading noise canceling headphones.").skuCode("elec_sony_headphones").price(new BigDecimal("349.00")).imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800").category("electronics").build(),
                Product.builder().name("Samsung Odyssey G9").description("49-inch curved gaming monitor.").skuCode("elec_samsung_monitor").price(new BigDecimal("1299.99")).imageUrl("https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=800").category("electronics").build(),
                Product.builder().name("DJI Mavic 3").description("Professional imaging drone for aerial photography.").skuCode("elec_dji_drone").price(new BigDecimal("2199.00")).imageUrl("https://images.unsplash.com/photo-1473963342623-03027e596253?auto=format&fit=crop&q=80&w=800").category("electronics").build(),
                Product.builder().name("PlayStation 5").description("Next-gen gaming console with ultra-high speed SSD.").skuCode("elec_ps5_console").price(new BigDecimal("499.99")).imageUrl("https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800").category("electronics").build(),
                Product.builder().name("Nintendo Switch OLED").description("Handheld gaming console with vivid OLED screen.").skuCode("elec_switch_oled").price(new BigDecimal("349.99")).imageUrl("https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&q=80&w=800").category("electronics").build(),
                Product.builder().name("Kindle Paperwhite").description("Waterproof e-reader with high-resolution display.").skuCode("elec_kindle_pw").price(new BigDecimal("139.99")).imageUrl("https://images.unsplash.com/photo-1594980596229-6aad95430452?auto=format&fit=crop&q=80&w=800").category("electronics").build(),
                Product.builder().name("iPad Air M2").description("Thin, light, and powerful tablet.").skuCode("elec_ipad_air").price(new BigDecimal("599.00")).imageUrl("https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800").category("electronics").build(),
                Product.builder().name("GoPro HERO12").description("Ultimate action camera for high-quality video.").skuCode("elec_gopro_12").price(new BigDecimal("399.99")).imageUrl("https://images.unsplash.com/photo-1526170315873-3a5813e179ca?auto=format&fit=crop&q=80&w=800").category("electronics").build(),
                Product.builder().name("Anker PowerBank").description("High-capacity portable charger for all devices.").skuCode("elec_anker_pb").price(new BigDecimal("49.99")).imageUrl("https://images.unsplash.com/photo-1585333127302-3309de929532?auto=format&fit=crop&q=80&w=800").category("electronics").build(),

                // --- MEN'S CATEGORY (10 MORE PRODUCTS) ---
                Product.builder().name("Men's Knit Polo").description("Soft knit polo sweater for a refined look.").skuCode("men_knit_polo").price(new BigDecimal("65.00")).imageUrl("https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=800").category("men").build(),
                Product.builder().name("Men's Hiking Boots").description("Rugged boots built for the toughest trails.").skuCode("men_hiking_boots").price(new BigDecimal("135.00")).imageUrl("https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800").category("men").build(),
                Product.builder().name("Men's Cargo Joggers").description("Modern utility pants for street style.").skuCode("men_cargo_joggers").price(new BigDecimal("49.50")).imageUrl("https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800").category("men").build(),
                Product.builder().name("Men's Puffer Vest").description("Lightweight insulated vest for layering.").skuCode("men_puffer_vest").price(new BigDecimal("75.00")).imageUrl("https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=800").category("men").build(),
                Product.builder().name("Men's Linen Shirt").description("Breathable linen shirt for summer beach days.").skuCode("men_linen_shirt").price(new BigDecimal("38.00")).imageUrl("https://images.pexels.com/photos/4913369/pexels-photo-4913369.jpeg?auto=compress&cs=tinysrgb&w=800").category("men").build(),

                // --- WOMEN'S CATEGORY (10 MORE PRODUCTS) ---
                Product.builder().name("Women's Wrap Dress").description("Elegant wrap dress for a flattering silhouette.").skuCode("women_wrap_dress").price(new BigDecimal("55.00")).imageUrl("https://images.pexels.com/photos/5705475/pexels-photo-5705475.jpeg?auto=compress&cs=tinysrgb&w=800").category("women").build(),
                Product.builder().name("Women's Pleated Skirt").description("Flowy pleated skirt for a romantic look.").skuCode("women_pleated_skirt").price(new BigDecimal("45.00")).imageUrl("https://images.pexels.com/photos/5705475/pexels-photo-5705475.jpeg?auto=compress&cs=tinysrgb&w=800").category("women").build(),
                Product.builder().name("Women's Pointed Toe Flats").description("Comfortable and stylish flats for office wear.").skuCode("women_toe_flats").price(new BigDecimal("69.99")).imageUrl("https://images.pexels.com/photos/3756041/pexels-photo-3756041.jpeg?auto=compress&cs=tinysrgb&w=800").category("women").build(),
                Product.builder().name("Women's Trench Coat").description("Classic double-breasted trench coat for fall.").skuCode("women_trench_coat").price(new BigDecimal("159.00")).imageUrl("https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800").category("women").build(),
                Product.builder().name("Women's Statement Necklace").description("Bold gold-tone necklace for a glamorous touch.").skuCode("women_necklace").price(new BigDecimal("29.99")).imageUrl("https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=800").category("women").build()
            );

            // Re-adding the original 40 as well to ENSURE they stay in case of DB wipe
            List<Product> baseProducts = List.of(
                // Men's Category (10 original)
                Product.builder().name("Men's Premium Cotton Tee").description("High-quality cotton t-shirt for daily wear.").skuCode("men_cotton_tee").price(new BigDecimal("29.99")).imageUrl("https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800").category("men").build(),
                Product.builder().name("Men's Slim Fit Denim").description("Classic slim fit denim jeans.").skuCode("men_slim_denim").price(new BigDecimal("59.99")).imageUrl("https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800").category("men").build(),
                Product.builder().name("Men's Business Suit").description("Elegant black suit for professional occasions.").skuCode("men_suit_black").price(new BigDecimal("299.99")).imageUrl("https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=800").category("men").build(),
                Product.builder().name("Men's Sport Sneakers").description("Lightweight sneakers for running and gym.").skuCode("men_sneakers").price(new BigDecimal("79.99")).imageUrl("https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800").category("men").build(),
                Product.builder().name("Men's Leather Bomber Jacket").description("Rugged leather jacket for a classic look.").skuCode("men_leather_jacket").price(new BigDecimal("149.50")).imageUrl("https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=800").category("men").build(),
                Product.builder().name("Men's Oxford Shirt").description("Button-down oxford shirt for smart casual wear.").skuCode("men_oxford_shirt").price(new BigDecimal("45.00")).imageUrl("https://images.pexels.com/photos/4913369/pexels-photo-4913369.jpeg?auto=compress&cs=tinysrgb&w=800").category("men").build(),
                Product.builder().name("Men's Chino Pants").description("Versatile chinos in a modern slim fit.").skuCode("men_chinos").price(new BigDecimal("55.00")).imageUrl("https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800").category("men").build(),
                Product.builder().name("Men's Wool Overcoat").description("Warm and stylish wool coat for winter.").skuCode("men_wool_coat").price(new BigDecimal("199.99")).imageUrl("https://images.pexels.com/photos/3758115/pexels-photo-3758115.jpeg?auto=compress&cs=tinysrgb&w=800").category("men").build(),
                Product.builder().name("Men's Graphic Hoodie").description("Casual hoodie with a modern streetwear design.").skuCode("men_hoodie").price(new BigDecimal("49.99")).imageUrl("https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800").category("men").build(),
                Product.builder().name("Men's Formal Loafers").description("Handcrafted leather loafers for business wear.").skuCode("men_loafers").price(new BigDecimal("120.00")).imageUrl("https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800").category("men").build(),

                // Women's Category (10 original)
                Product.builder().name("Women's Floral Dress").description("Beautiful floral summer dress.").skuCode("women_floral_dress").price(new BigDecimal("49.99")).imageUrl("https://images.pexels.com/photos/5705475/pexels-photo-5705475.jpeg?auto=compress&cs=tinysrgb&w=800").category("women").build(),
                Product.builder().name("Women's Designer Handbag").description("Luxury leather handbag for style.").skuCode("women_handbag").price(new BigDecimal("129.99")).imageUrl("https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800").category("women").build(),
                Product.builder().name("Women's Activewear Set").description("Comfortable yoga leggings and top.").skuCode("women_activewear").price(new BigDecimal("54.99")).imageUrl("https://images.pexels.com/photos/3756041/pexels-photo-3756041.jpeg?auto=compress&cs=tinysrgb&w=800").category("women").build(),
                Product.builder().name("Women's Evening Gown").description("Stunning red gown for parties.").skuCode("women_gown_red").price(new BigDecimal("189.99")).imageUrl("https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=800").category("women").build(),
                Product.builder().name("Women's Silk Scarf").description("Soft silk scarf with a unique artistic print.").skuCode("women_scarf").price(new BigDecimal("35.00")).imageUrl("https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800").category("women").build(),
                Product.builder().name("Women's Chelsea Boots").description("Classic leather Chelsea boots for everyday wear.").skuCode("women_boots").price(new BigDecimal("95.00")).imageUrl("https://images.pexels.com/photos/3756041/pexels-photo-3756041.jpeg?auto=compress&cs=tinysrgb&w=800").category("women").build(),
                Product.builder().name("Women's Cashmere Sweater").description("Ultra-soft cashmere sweater for premium comfort.").skuCode("women_sweater").price(new BigDecimal("145.00")).imageUrl("https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800").category("women").build(),
                Product.builder().name("Women's Denim Shorts").description("High-waisted denim shorts for summer outings.").skuCode("women_shorts").price(new BigDecimal("39.99")).imageUrl("https://images.pexels.com/photos/5705475/pexels-photo-5705475.jpeg?auto=compress&cs=tinysrgb&w=800").category("women").build(),
                Product.builder().name("Women's Blazers").description("Tailored blazer for a professional silhouette.").skuCode("women_blazer").price(new BigDecimal("110.00")).imageUrl("https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800").category("women").build(),
                Product.builder().name("Women's Sunglasses").description("Cat-eye sunglasses with UV protection.").skuCode("women_sunglasses").price(new BigDecimal("65.00")).imageUrl("https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=800").category("women").build(),

                // --- KIDS' CATEGORY (10 PRODUCTS) ---
                Product.builder().name("Kids' Graphic T-Shirt").description("Fun colorful tee for children.").skuCode("kids_graphic_tee").price(new BigDecimal("19.99")).imageUrl("https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=compress&cs=tinysrgb&w=800").category("kids").build(),
                Product.builder().name("Kids' Soft Hoodie").description("Warm and soft hoodie for cool weather.").skuCode("kids_hoodie").price(new BigDecimal("34.99")).imageUrl("https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&w=800").category("kids").build(),
                Product.builder().name("Kids' Denim Jacket").description("Stylish denim jacket for toddlers.").skuCode("kids_denim_jacket").price(new BigDecimal("39.99")).imageUrl("https://images.pexels.com/photos/35188/child-children-boy-happy.jpg?auto=compress&cs=tinysrgb&w=800").category("kids").build(),
                Product.builder().name("Kids' Canvas Shoes").description("Easy to wear slip-on canvas shoes.").skuCode("kids_shoes").price(new BigDecimal("24.99")).imageUrl("https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=compress&cs=tinysrgb&w=800").category("kids").build(),
                Product.builder().name("Kids' Raincoat").description("Bright yellow waterproof raincoat for rainy days.").skuCode("kids_raincoat").price(new BigDecimal("29.99")).imageUrl("https://images.pexels.com/photos/1104007/pexels-photo-1104007.jpeg?auto=compress&cs=tinysrgb&w=800").category("kids").build(),
                Product.builder().name("Kids' Puffy Vest").description("Insulated vest for extra warmth during play.").skuCode("kids_vest").price(new BigDecimal("45.00")).imageUrl("https://images.pexels.com/photos/35188/child-children-boy-happy.jpg?auto=compress&cs=tinysrgb&w=800").category("kids").build(),
                Product.builder().name("Kids' Adventure Backpack").description("Durable backpack for school and trips.").skuCode("kids_backpack").price(new BigDecimal("32.50")).imageUrl("https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&w=800").category("kids").build(),
                Product.builder().name("Kids' Polka Dot Dress").description("Cute polka dot cotton dress for girls.").skuCode("kids_dress").price(new BigDecimal("28.00")).imageUrl("https://images.pexels.com/photos/1104007/pexels-photo-1104007.jpeg?auto=compress&cs=tinysrgb&w=800").category("kids").build(),
                Product.builder().name("Kids' Sport Shorts").description("Breathable mesh shorts for active play.").skuCode("kids_shorts").price(new BigDecimal("15.99")).imageUrl("https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=compress&cs=tinysrgb&w=800").category("kids").build(),
                Product.builder().name("Kids' Beanie Hat").description("Soft knit beanie for chilly mornings.").skuCode("kids_beanie").price(new BigDecimal("12.00")).imageUrl("https://images.pexels.com/photos/35188/child-children-boy-happy.jpg?auto=compress&cs=tinysrgb&w=800").category("kids").build(),

                // --- HOME CATEGORY (10 PRODUCTS) ---
                Product.builder().name("Modern Table Lamp").description("Sleek minimalist lamp for your desk.").skuCode("home_lamp").price(new BigDecimal("45.00")).imageUrl("https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800").category("home").build(),
                Product.builder().name("Ceramic Vase Set").description("set of 3 decorative ceramic vases.").skuCode("home_vase_set").price(new BigDecimal("35.99")).imageUrl("https://images.pexels.com/photos/1125130/pexels-photo-1125130.jpeg?auto=compress&cs=tinysrgb&w=800").category("home").build(),
                Product.builder().name("Plush Throw Blanket").description("Extra soft throw for the sofa.").skuCode("home_blanket").price(new BigDecimal("25.00")).imageUrl("https://images.pexels.com/photos/545012/pexels-photo-545012.jpeg?auto=compress&cs=tinysrgb&w=800").category("home").build(),
                Product.builder().name("Scented Candle Set").description("Premium lavender and vanilla soy candles.").skuCode("home_candles").price(new BigDecimal("18.50")).imageUrl("https://images.pexels.com/photos/1170664/pexels-photo-1170664.jpeg?auto=compress&cs=tinysrgb&w=800").category("home").build(),
                Product.builder().name("Wall Clock Minimalist").description("Quiet quartz movement minimalist wall clock.").skuCode("home_clock").price(new BigDecimal("30.00")).imageUrl("https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800").category("home").build(),
                Product.builder().name("Faux Succulents").description("Set of 4 lifelike artificial succulent plants.").skuCode("home_plants").price(new BigDecimal("22.00")).imageUrl("https://images.pexels.com/photos/1125130/pexels-photo-1125130.jpeg?auto=compress&cs=tinysrgb&w=800").category("home").build(),
                Product.builder().name("Decorative Cushions").description("Pack of 2 velvet decorative cushion covers.").skuCode("home_cushions").price(new BigDecimal("28.99")).imageUrl("https://images.pexels.com/photos/545012/pexels-photo-545012.jpeg?auto=compress&cs=tinysrgb&w=800").category("home").build(),
                Product.builder().name("Floor Coffee Table").description("Rustic wooden coffee table for the living room.").skuCode("home_table").price(new BigDecimal("125.00")).imageUrl("https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800").category("home").build(),
                Product.builder().name("Framed Art Piece").description("Contemporary abstract wall art in a black frame.").skuCode("home_art").price(new BigDecimal("85.00")).imageUrl("https://images.pexels.com/photos/1125130/pexels-photo-1125130.jpeg?auto=compress&cs=tinysrgb&w=800").category("home").build(),
                Product.builder().name("Luxury Bath Towels").description("Set of 2 oversized premium egyptian cotton towels.").skuCode("home_towels").price(new BigDecimal("40.00")).imageUrl("https://images.pexels.com/photos/545012/pexels-photo-545012.jpeg?auto=compress&cs=tinysrgb&w=800").category("home").build()
            );

            for (Product product : products) {
                if (!productRepository.existsBySkuCode(product.getSkuCode())) {
                    productRepository.save(product);
                }
            }
            for (Product product : baseProducts) {
                if (!productRepository.existsBySkuCode(product.getSkuCode())) {
                    productRepository.save(product);
                }
            }
            System.out.println("--- MASSIVE DATA SEEDING COMPLETE (" + (products.size() + baseProducts.size()) + " PRODUCTS) ---");
        };
    }
}
