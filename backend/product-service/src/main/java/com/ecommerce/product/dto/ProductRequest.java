package com.ecommerce.product.dto;

import java.math.BigDecimal;

public record ProductRequest(String name, String description, String skuCode, BigDecimal price, String imageUrl, String category, String subCategory) {}
