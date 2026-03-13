package com.ecommerce.payment.dto;

public record PaymentIntentRequest(
        Long amount,
        String currency,
        String orderId,
        String userEmail
) {}
