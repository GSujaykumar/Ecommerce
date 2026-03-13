package com.ecommerce.order.event;

import java.math.BigDecimal;

public record OrderPlacedEvent(String orderNumber, String email, String mobileNumber, String totalAmount) {}
