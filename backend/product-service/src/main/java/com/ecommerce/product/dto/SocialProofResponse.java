package com.ecommerce.product.dto;

public record SocialProofResponse(
        Long productId,
        int activeViewers,
        int stockLeft,
        String recentPurchaseText
) {}
