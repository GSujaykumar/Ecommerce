# Days 9-11: Support Services

## Day 9: Review Service
- **Purpose**: Users rate products.
- **Key Feature**: Calculate "Average Rating" dynamically when a new review is added.
- **Tech**: Simple CRUD with Spring Data JPA. Linked to `productId`.

## Day 10: Shipping Service
- **Purpose**: Track delivery.
- **Key Feature**: State Machine pattern (Order Placed -> Packed -> Shipped -> Out for Delivery -> Delivered).
- **Tech**: Can use `Spring State Machine` library or simple Enums.

## Day 11: Notification Service
- **Purpose**: Don't block the user waiting for an email to send.
- **Async Pattern**: 
  1. Order Service sends a message to **Kafka/RabbitMQ** topic `notificationTopic`.
  2. Notification Service listens to this topic.
  3. When message arrives, it sends the email in the background.
- **Tech**: `spring-kafka`.
