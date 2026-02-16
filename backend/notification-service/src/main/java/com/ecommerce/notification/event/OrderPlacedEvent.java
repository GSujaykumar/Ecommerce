package com.ecommerce.notification.event;

public record OrderPlacedEvent(String orderNumber, String email, String mobileNumber) {}
