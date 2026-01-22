package com.ecommerce.order.dto;

import java.util.List;

public record OrderRequest(
    List<OrderLineItemsDto> orderLineItemsDtoList,
    String email,
    String mobileNumber
) {}
