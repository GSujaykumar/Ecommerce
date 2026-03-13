# Day 7: Payment Service

The **Payment Service** handles financial transactions.

## 🔨 Implementation

### 1. Mocking Payments
Connect actual Stripe/PayPal in production. For now, we mock it.
- **Rules**: If `amount > 10000`, reject it (simulate insufficient funds).
- **Random Failures**: Randomly fail 10% of requests to test system resilience.

### 2. Security
This service must be strictly secured. Only the **Order Service** (machine-to-machine) should be allowed to call it, not regular users directly. We use Client Credentials Flow for this (covered in Day 15).

### 3. Database
We store `PaymentHistory` to track transaction IDs and status (`SUCCESS`, `FAILED`).
