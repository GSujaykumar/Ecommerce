# Day 8: Inventory Service

## 🔨 Implementation

### 1. Stock Management
Tracks how many items are left.
- `skuCode` (e.g., "IPHONE_15_RED")
- `quantity` (e.g., 100)

### 2. Concurrency Issues (Advanced)
What if 2 users buy the last item at the exact same millisecond?
- **Optimistic Locking**: Use a `@Version` annotation on the Entity. Hibernate handles the check automatically.
- **Pessimistic Locking**: Lock the database row (`SELECT ... FOR UPDATE`).

We will use **Optimistic Locking** for better performance.

### 3. API
- `GET /api/inventory?skuCode=ihpone-13&skuCode=iphone-13-red`: Returns availability.
