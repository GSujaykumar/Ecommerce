package com.ecommerce.order.service.impl;

import com.ecommerce.order.dto.OrderRequest;
import com.ecommerce.order.dto.OrderResponse;
import com.ecommerce.order.dto.OrderLineItemsDto;
import com.ecommerce.order.model.Order;
import com.ecommerce.order.model.OrderLineItems;
import com.ecommerce.order.repository.OrderRepository;
import com.ecommerce.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final org.springframework.web.reactive.function.client.WebClient.Builder webClientBuilder;
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Override
    @CircuitBreaker(name = "inventory", fallbackMethod = "inventoryFallback")
    public String placeOrder(OrderRequest orderRequest, String userId) {
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());
        order.setUserId(userId);
        order.setStatus("PLACED");
        order.setPlacedAt(java.time.LocalDateTime.now());

        List<OrderLineItems> orderLineItems = orderRequest.orderLineItemsDtoList()
                .stream()
                .map(dto -> OrderLineItems.builder()
                        .skuCode(dto.skuCode())
                        .price(dto.price())
                        .quantity(dto.quantity())
                        .build())
                .collect(Collectors.toList());

        order.setOrderLineItemsList(orderLineItems);
        
        java.math.BigDecimal total = orderLineItems.stream()
                .map(item -> item.getPrice().multiply(java.math.BigDecimal.valueOf(item.getQuantity())))
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);
        order.setTotalPrice(total);

        // Call Inventory Service, and place order if product is in stock
        List<String> skuCodes = order.getOrderLineItemsList().stream()
                .map(OrderLineItems::getSkuCode)
                .toList();
        
        // Advanced Inter-Service Communication
        com.ecommerce.order.dto.InventoryResponse[] inventoryResponseArray = webClientBuilder.build().get()
                .uri("http://localhost:8086/api/inventory",
                        uriBuilder -> uriBuilder.queryParam("skuCode", skuCodes).build())
                .retrieve()
                .bodyToMono(com.ecommerce.order.dto.InventoryResponse[].class)
                .block();

        // For demo purposes and robustness:
        boolean allProductsInStock = true;
        if(inventoryResponseArray != null && inventoryResponseArray.length > 0) {
            allProductsInStock = java.util.Arrays.stream(inventoryResponseArray)
                 .allMatch(com.ecommerce.order.dto.InventoryResponse::isInStock);
        }

        if(allProductsInStock) {
            orderRepository.save(order);
            kafkaTemplate.send("notificationTopic", order.getOrderNumber());
            return order.getOrderNumber();
        } else {
            throw new IllegalArgumentException("Product is not in stock, please try again later");
        }
    }
    
    public String inventoryFallback(OrderRequest orderRequest, String userId, Throwable runtimeException) {
        // This is advanced Resilience Logic
        // If Inventory Service is down, we can either:
        // 1. Accept order tentatively (Pending Inventory)
        // 2. Reject it gracefully
        throw new RuntimeException("Oops! Something went wrong when placing order. Please try after some time!");
    }

    @Override
    public List<OrderResponse> getMyOrders(String userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(order -> new OrderResponse(
                        order.getOrderNumber(), 
                        order.getTotalPrice(), 
                        order.getStatus(),
                        order.getPlacedAt(),
                        order.getOrderLineItemsList().stream()
                            .map(item -> new OrderLineItemsDto(item.getId(), item.getSkuCode(), item.getPrice(), item.getQuantity()))
                            .collect(Collectors.toList())
                ))
                .toList();
    }
}
