# Day 6: Order Service

The **Order Service** is the most critical component. It ties everything together.

## 🔨 Implementation

### 1. Workflow
When a user clicks "Place Order":
1.  **Validate**: Check if items are in stock (Call Inventory Service).
2.  **Create**: Save Order to MySQL with status `PENDING`.
3.  **Payment**: Initiate Payment (Call Payment Service).
4.  **Success**: If payment works, update status to `PLACED` and send logic to Notification Service.

### 2. Entities
- `Order`: id, orderNumber, userId, skuCodes[], totalPrice.
- `OrderLineItems`: Details of each product in the order.

### 3. Synchronous Communication
The Order Service needs to "talk" to Inventory. We use `WebClient` (modern replacement for RestTemplate) to make HTTP calls between microservices.

```java
// Example WebClient call
Boolean result = webClient.get()
        .uri("http://inventory-service/api/inventory/" + skuCode)
        .retrieve()
        .bodyToMono(Boolean.class)
        .block();
```

## 🧪 Testing
1. Ensure `inventory-service` is running.
2. Ensure `mysql` is running.
3. Place an Order.
4. Check database: `SELECT * FROM t_orders;`
