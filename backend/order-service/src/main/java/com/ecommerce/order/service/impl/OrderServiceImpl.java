import com.ecommerce.inventory.grpc.InventoryRequest;
import com.ecommerce.inventory.grpc.InventoryServiceGrpc;
import com.ecommerce.inventory.grpc.StockInfo;
import com.ecommerce.order.dto.*;
import com.ecommerce.order.event.OrderPlacedEvent;
import com.ecommerce.order.model.Order;
import com.ecommerce.order.model.OrderLineItems;
import com.ecommerce.order.repository.OrderRepository;
import com.ecommerce.order.service.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.http.MediaType;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final org.springframework.web.reactive.function.client.WebClient.Builder webClientBuilder;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final org.springframework.amqp.rabbit.core.RabbitTemplate rabbitTemplate;
    private final ObjectMapper objectMapper;

    @GrpcClient("inventory-service")
    private InventoryServiceGrpc.InventoryServiceBlockingStub inventoryStub;

    @Override
    @CircuitBreaker(name = "inventory", fallbackMethod = "inventoryFallback")
    public String placeOrder(OrderRequest orderRequest, String userId) {
        if (userId == null || userId.isEmpty() || userId.equals("test-user")) {
            throw new IllegalArgumentException("User must be logged in to place an order");
        }
        
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
        
        // High-Speed Binary gRPC Inter-Service Communication
        log.info("Checking inventory via gRPC for SKUs: {}", skuCodes);
        InventoryRequest gRpcRequest = InventoryRequest.newBuilder()
                .addAllSkuCode(skuCodes)
                .build();

        var gRpcResponse = inventoryStub.isInStock(gRpcRequest);
        
        boolean allProductsInStock = gRpcResponse.getStockInfoList().stream()
                .allMatch(StockInfo::getIsInStock);
        
        log.info("gRPC Inventory Result: {}", allProductsInStock);

        if(allProductsInStock) {
            // Save order FIRST so it exists in DB before payment call
            orderRepository.save(order);
            log.info("Order saved: orderNumber={}, userId={}, total={}", order.getOrderNumber(), userId, total);

            // CALL PAYMENT SERVICE (with proper Content-Type header)
            try {
                String paymentResponse = webClientBuilder.build().post()
                    .uri("http://payment-service/api/payment")
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(new PaymentRequest(order.getTotalPrice(), order.getOrderNumber(), userId))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

                log.info("Payment Response for order {}: {}", order.getOrderNumber(), paymentResponse);
            } catch (Exception e) {
                log.error("Payment Service Call Failed for order {}: {}", order.getOrderNumber(), e.getMessage(), e);
                // Order is already saved; payment will be in PENDING state
            }

            // Send notifications (best-effort)
            sendNotifications(order, orderRequest);
            
            return order.getOrderNumber();
        } else {
            throw new IllegalArgumentException("Product is not in stock, please try again later");
        }
    }

    private void sendNotifications(Order order, OrderRequest orderRequest) {
        try {
            OrderPlacedEvent event = new OrderPlacedEvent(
                order.getOrderNumber(),
                orderRequest.email(),
                orderRequest.mobileNumber() != null ? orderRequest.mobileNumber() : "",
                order.getTotalPrice() != null ? order.getTotalPrice().toString() : "0"
            );
            String jsonEvent = objectMapper.writeValueAsString(event);
            
            // Primary: Kafka
            try {
                kafkaTemplate.send("notificationTopic", jsonEvent);
                log.info("Sent OrderPlacedEvent to Kafka: {}", jsonEvent);
            } catch (Exception ke) {
                log.warn("Failed to send to Kafka (non-fatal): {}", ke.getMessage());
            }

            // Secondary/Alternative: RabbitMQ (for dual notification support)
            try {
                rabbitTemplate.convertAndSend("notificationQueue", jsonEvent);
                log.info("Sent OrderPlacedEvent to RabbitMQ: {}", jsonEvent);
            } catch (Exception re) {
                log.warn("Failed to send to RabbitMQ (non-fatal): {}", re.getMessage());
            }
            
        } catch (Exception e) {
            log.error("Failed to prepare notification event: {}", e.getMessage());
        }
    }
    
    /**
     * Fallback: When inventory service is down, still place the order in PENDING status.
     * In production you'd queue this for retry; for demo we allow it through.
     */
    public String inventoryFallback(OrderRequest orderRequest, String userId, Throwable ex) {
        log.warn("Inventory service unavailable ({}). Placing order in PENDING_STOCK_CHECK status.", ex.getMessage());
        
        if (userId == null || userId.isEmpty() || userId.equals("test-user")) {
            throw new IllegalArgumentException("User must be logged in to place an order");
        }

        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());
        order.setUserId(userId);
        order.setStatus("PENDING_STOCK_CHECK");
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

        // Save order
        orderRepository.save(order);
        log.info("Order saved (fallback): orderNumber={}, userId={}", order.getOrderNumber(), userId);

        // Still try payment
        try {
            webClientBuilder.build().post()
                .uri("http://payment-service/api/payment")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(new PaymentRequest(total, order.getOrderNumber(), userId))
                .retrieve()
                .bodyToMono(String.class)
                .block();
            log.info("Payment processed in fallback for order {}", order.getOrderNumber());
        } catch (Exception pe) {
            log.error("Payment also failed in fallback: {}", pe.getMessage());
        }

        // Send notifications
        sendNotifications(order, orderRequest);

        return order.getOrderNumber();
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

