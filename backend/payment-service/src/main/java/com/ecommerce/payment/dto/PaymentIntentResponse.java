package com.ecommerce.payment.dto;

public record PaymentIntentResponse(
        String clientSecret,
        String paymentIntentId
) {}
