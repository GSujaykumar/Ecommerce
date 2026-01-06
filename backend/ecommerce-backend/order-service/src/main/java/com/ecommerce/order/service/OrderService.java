package com.ecommerce.order.service;

import com.ecommerce.order.dto.OrderRequest;
import com.ecommerce.order.dto.OrderResponse;
import java.util.List;

public interface OrderService {
    String placeOrder(OrderRequest orderRequest, String userId); // Returns Order Number
    List<OrderResponse> getMyOrders(String userId);
}
