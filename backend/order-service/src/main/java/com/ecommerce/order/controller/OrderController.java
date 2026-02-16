package com.ecommerce.order.controller;

import com.ecommerce.order.dto.OrderRequest;
import com.ecommerce.order.dto.OrderResponse;
import com.ecommerce.order.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String placeOrder(@RequestBody OrderRequest orderRequest, @RequestHeader(value = "X-User-Id", defaultValue = "test-user") String userId) {
        return orderService.placeOrder(orderRequest, userId);
    }

    @GetMapping
    public List<OrderResponse> getMyOrders(@RequestHeader(value = "X-User-Id", defaultValue = "test-user") String userId) {
        return orderService.getMyOrders(userId);
    }
}
