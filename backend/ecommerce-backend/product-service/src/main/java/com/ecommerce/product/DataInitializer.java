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
            if (productRepository.count() == 0) {
                List<Product> products = List.of(
                    // Electronics
                    Product.builder()
                        .name("iPhone 15 Pro Max")
                        .description("Titanium design, A17 Pro chip, 48MP Main camera, USB-C.")
                        .skuCode("iphone_15_pro_max")
                        .price(new BigDecimal("1199.00"))
                        .imageUrl("https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=2070")
                        .category("Electronics")
                        .build(),
                    Product.builder()
                        .name("MacBook Air M3")
                        .description("Lean. Mean. M3 machine. 13.6-inch Liquid Retina display.")
                        .skuCode("macbook_air_m3")
                        .price(new BigDecimal("1099.00"))
                        .imageUrl("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=2069")
                        .category("Electronics")
                        .build(),
                    Product.builder()
                        .name("Sony WH-1000XM5")
                        .description("Industry-leading noise canceling headphones with Auto NC Optimizer.")
                        .skuCode("sony_wh1000xm5")
                        .price(new BigDecimal("398.00"))
                        .imageUrl("https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1976")
                        .category("Electronics")
                        .build(),
                    Product.builder()
                        .name("Samsung Galaxy S24 Ultra")
                        .description("Galaxy AI is here. The ultimate Galaxy experience.")
                        .skuCode("samsung_s24_ultra")
                        .price(new BigDecimal("1299.00"))
                        .imageUrl("https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=2071")
                        .category("Electronics")
                        .build(),
                    
                    // Fashion
                    Product.builder()
                        .name("Nike Air Jordan 1")
                        .description("The shoe that started it all. Iconic design and premium materials.")
                        .skuCode("nike_air_jordan_1")
                        .price(new BigDecimal("180.00"))
                        .imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=2070")
                        .category("Fashion")
                        .build(),
                    Product.builder()
                        .name("Adidas Ultraboost 1.0")
                        .description("Energy-returning BOOST midsole for endless comfort.")
                        .skuCode("adidas_ultraboost")
                        .price(new BigDecimal("190.00"))
                        .imageUrl("https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&q=80&w=2070")
                        .category("Fashion")
                        .build(),
                    Product.builder()
                        .name("Rolex Submariner")
                        .description("The reference among divers' watches. Oystersteel.")
                        .skuCode("rolex_submariner")
                        .price(new BigDecimal("9950.00"))
                        .imageUrl("https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=2079")
                        .category("Fashion")
                        .build(),

                    // Home & Others
                    Product.builder()
                        .name("Dyson V15 Detect")
                        .description("Powerful cordless vacuum. Lazers reveal microscopic dust.")
                        .skuCode("dyson_v15")
                        .price(new BigDecimal("749.99"))
                        .imageUrl("https://images.unsplash.com/photo-1558317374-a309d9361ad7?auto=format&fit=crop&q=80&w=2070")
                        .category("Home")
                        .build(),
                    Product.builder()
                        .name("Nespresso Vertuo Next")
                        .description("Versatile coffee styles. Centrifusion technology.")
                        .skuCode("nespresso_vertuo")
                        .price(new BigDecimal("179.00"))
                        .imageUrl("https://images.unsplash.com/photo-1517080315802-1a48c6657c66?auto=format&fit=crop&q=80&w=2072")
                        .category("Home")
                        .build(),
                     Product.builder()
                        .name("PlayStation 5")
                        .description("Play Has No Limits. Lightning fast loading.")
                        .skuCode("ps5_console")
                        .price(new BigDecimal("499.00"))
                        .imageUrl("https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=2072")
                        .category("Home")
                        .build()
                );

                productRepository.saveAll(products);
                System.out.println("--- DUMMY DATA SEEDED ---");
            }
        };
    }
}
