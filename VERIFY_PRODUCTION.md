---
description: Guide to verify verify production level status
---
# 🚀 Production Verification Guide

You are using your **Local MySQL** with `ecommerce` database scheme.

## 1. Start Support Infrastructure (Docker)
Ensure Docker Desktop is running, then in terminal:
```powershell
cd c:\Users\admin\Desktop\EcommerReactUI\EcommerceReact\backend
docker-compose up -d
```
*(This creates Redis, Keycloak, Kafka, Zipkin containers)*

## 2. Start Microservices
Run each of these in a separate terminal:

1.  **Api Gateway**: `mvn spring-boot:run` (in `backend/ecommerce-backend/api-gateway`)
2.  **Product Service**: `mvn spring-boot:run` (in `backend/ecommerce-backend/product-service`)
3.  **Order Service**: `mvn spring-boot:run` (in `backend/ecommerce-backend/order-service`)
4.  **Cart Service**: `mvn spring-boot:run` (in `backend/ecommerce-backend/cart-service`)
5.  **Inventory Service**: `mvn spring-boot:run` (in `backend/ecommerce-backend/inventory-service`)

## 3. Verify Frontend
1.  Go to [http://localhost:5173](http://localhost:5173).
2.  **Footer**: Check for "Online (MySQL Connected)" Green dot.
3.  **Products**: You should see correctly imaged iPhone, MacBook, etc.
4.  **Buy**: You can now "Add to Cart" and "Checkout". The Orders will be saved to your local database!

## 4. Reset Data (If you see old images)
If you still see "shirt" images:
1.  Open MySQL Client.
2.  Run:
    ```sql
    USE ecommerce;
    DELETE FROM t_products;
    ```
3.  Restart **Product Service**. It will re-seed the table with the *new correct images*.
