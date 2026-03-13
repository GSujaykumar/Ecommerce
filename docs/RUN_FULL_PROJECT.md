# How to Run the Complete E-Commerce Microservices Project

You have successfully built a production-grade microservices system!

## 1. Infrastructure Setup (Docker)
First, start all the supporting infrastructure services (Keycloak, Kafka, Zookeeper, Zipkin, Prometheus, MailDev).

```bash
cd backend
docker-compose up -d
```

**Wait** for about 2-3 minutes for Keycloak and Kafka to fully initialize.

## 2. Start Backend Services
You need to run each service in a separate terminal. (Recommend using an IDE to run them in parallel).

*Run order is important!*

1.  **Discovery Server**: (Not needed if using simple url config, but good practice if you have it)
    *   *Note: Our current config uses direct URLs for simplicity, so you can skip this if you didn't build it.*
2.  **Product Service**: `backend/ecommerce-backend/product-service` -> `mvn spring-boot:run`
3.  **Inventory Service**: `backend/ecommerce-backend/inventory-service` -> `mvn spring-boot:run`
4.  **Order Service**: `backend/ecommerce-backend/order-service` -> `mvn spring-boot:run`
5.  **Notification Service**: `backend/ecommerce-backend/notification-service` -> `mvn spring-boot:run`
6.  **Payment Service**: `backend/ecommerce-backend/payment-service` -> `mvn spring-boot:run`
7.  **Cart Service**: `backend/ecommerce-backend/cart-service` -> `mvn spring-boot:run`
8.  **API Gateway**: `backend/ecommerce-backend/api-gateway` -> `mvn spring-boot:run`    
    *   *This acts as the single entry point on port 8080.*

## 3. Start Frontend
```bash
cd EcommerceReact
npm run dev
```

## 4. Verify Features
1.  **Home Page**: You should see products (iPhone 15, Galaxy S24, etc.).
2.  **Add to Cart**: Click "Add to Cart". (Works via Cart Service).
3.  **Checkout**: 
    - Go to Cart -> Checkout.
    - Click "Confirm Order".
    - **Success**: You see a green Toast notification.
    - **Email**: Go to `http://localhost:1080` (MailDev) to see the "Order Confirmation" email!
4.  **Resilience**:
    - Stop functionality of `inventory-service`.
    - Try to order. You get a "Oops! Something went wrong" Toast (Circuit Breaker).
5.  **Monitoring**:
    - **Zipkin**: `http://localhost:9411` (Distributed Tracing).
    - **Prometheus**: `http://localhost:9090` (Metrics).
    - **Order Service Health**: `http://localhost:8083/actuator/health`.

## Troubleshooting
- **Ports**:
    - Frontend: 5173
    - Gateway: 8080
    - Users: 8081
    - Products: 8082
    - Orders: 8083
    - Carts: 8084
    - Payments: 8085
    - Inventory: 8086
    - Notifications: 8087
    - MailDev: 1080
    - Keycloak: 8181
- **Database**: Each service uses H2 (in-memory) or MySQL depending on config. Restarting resetting H2 data may be required if IDs get out of sync.

Congratulations on your Full Stack Microservices App!
