# Day 5: Cart Service

The **Cart Service** manages the user's shopping session.

## 🔨 Implementation

### 1. Redis for Speed
Shopping carts are temporary. Storing them in a permanent SQL database is often overkill and slow. We use **Redis**, a fast in-memory key-value store. This makes adding/removing items instantaneous.

### 2. Code Structure
- **Model**: `Cart`, `CartItem`.
- **Repository**: `CartRepository` (RedisHash).
- **Service**: Logic to calculate totals.

### 3. Dependencies
We added `spring-boot-starter-data-redis` to the `pom.xml`.

### 4. Logic
- **Add Item**: Check if item exists, update quantity, or add new.
- **Remove Item**: Delete from Redis.
- **Get Cart**: Retrieve by User ID.

## 🧪 Testing
1. Install Redis (via Docker: `docker run -d -p 6379:6379 redis`).
2. Run `cart-service`.
3. POST `/api/cart/{userId}` with an item.
4. It should be saved in Redis (check using redis-cli).
