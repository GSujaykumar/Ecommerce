package com.ecommerce.aggregation.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Controller
@RequiredArgsConstructor
public class AggregationController {

    private final WebClient.Builder webClientBuilder;

    @QueryMapping
    public Mono<ProductAggregation> productDetails(@Argument Long id) {
        // Parallel fetching from multiple services
        Mono<ProductResponse> productMono = webClientBuilder.build().get()
                .uri("http://product-service/api/products/" + id)
                .retrieve()
                .bodyToMono(ProductResponse.class);

        Mono<SocialProofResponse> socialMono = webClientBuilder.build().get()
                .uri("http://product-service/api/products/" + id + "/social-proof")
                .retrieve()
                .bodyToMono(SocialProofResponse.class);

        return Mono.zip(productMono, socialMono)
                .map(tuple -> {
                    ProductResponse p = tuple.getT1();
                    SocialProofResponse s = tuple.getT2();
                    return new ProductAggregation(
                            p.getId(), p.getName(), p.getDescription(), p.getPrice(),
                            p.getCategory(), p.getImageUrl(), s.getStockLeft() > 0, s.getActiveViewers()
                    );
                });
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    static class ProductAggregation {
        private Long id;
        private String name;
        private String description;
        private Double price;
        private String category;
        private String imageUrl;
        private Boolean stockStatus;
        private Integer activeViewers;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    static class ProductResponse {
        private Long id;
        private String name;
        private String description;
        private Double price;
        private String category;
        private String imageUrl;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    static class SocialProofResponse {
        private Integer activeViewers;
        private Integer stockLeft;
    }
}
