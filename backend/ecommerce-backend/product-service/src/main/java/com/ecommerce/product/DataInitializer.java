package com.ecommerce.product;

import com.ecommerce.product.model.Product;
import com.ecommerce.product.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner loadData(ProductRepository productRepository) {
        return args -> {
            if (productRepository.count() == 0) {
                Product p1 = Product.builder()
                        .name("iPhone 15")
                        .description("Apple Smartphone")
                        .price(new BigDecimal(999))
                        .imageUrl("https://placehold.co/400x400/png?text=iPhone+15")
                        .build();
                
                Product p2 = Product.builder()
                        .name("Samsung Galaxy S24")
                        .description("Android Flagship")
                        .price(new BigDecimal(899))
                        .imageUrl("https://placehold.co/400x400/png?text=Galaxy+S24")
                        .build();

                Product p3 = Product.builder()
                        .name("Sony Headphones")
                        .description("Noise Cancelling")
                        .price(new BigDecimal(299))
                        .imageUrl("https://placehold.co/400x400/png?text=Sony+Headphones")
                        .build();

                Product p4 = Product.builder()
                         .name("MacBook Pro")
                         .description("M3 Chip")
                         .price(new BigDecimal(1999))
                         .imageUrl("https://placehold.co/400x400/png?text=Macbook")
                         .build();

                productRepository.save(p1);
                productRepository.save(p2);
                productRepository.save(p3);
                productRepository.save(p4);
            }
        };
    }
}
