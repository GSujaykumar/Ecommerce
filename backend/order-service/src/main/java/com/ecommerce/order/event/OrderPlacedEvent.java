package com.ecommerce.order.event;

public record OrderPlacedEvent(String orderNumber, String email, String mobileNumber) {}
