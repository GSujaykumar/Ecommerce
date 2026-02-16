package com.ecommerce.order.dto;

import java.math.BigDecimal;

public record PaymentRequest(BigDecimal amount, String orderId) {}
