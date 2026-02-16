package com.ecommerce.order.dto;

import java.math.BigDecimal;

import java.util.List;

public record OrderResponse(String orderNumber, BigDecimal totalPrice, String status, java.time.LocalDateTime placedAt, List<OrderLineItemsDto> items) {}
