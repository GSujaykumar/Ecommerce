# 🚀 Microservices Run Sheet

Here is exactly how to run your entire system.

## 1. Prerequisites
- Docker Desktop is running.
- Maven is installed.
- Java 17 is installed.

## 2. Start Infrastructure (Docker)
Open a terminal in `backend/`:
```bash
docker-compose up -d
```
This starts **Keycloak** (Auth), **Redis** (Cache), **Zipkin** (Tracing), and any other DBs defined.

## 3. Build All Services
Open a terminal in the `backend/ecommerce-backend` root folder:
```bash
mvn clean install -DskipTests
```
This commands compiles all microservices and creates the `.jar` files in `target/` folders.

## 4. Run Services (In Order)
It is best to run these in separate terminal tabs so you can see the logs for each.

**Tab 1: Discovery Server** (Must be first!)
```bash
cd discovery-server
mvn spring-boot:run
```
*Wait for it to start on port 8761.*

**Tab 2: API Gateway**
```bash
cd api-gateway
mvn spring-boot:run
```
*Wait for it to start on port 8080.*

**Tab 3: Product Service**
```bash
cd product-service
mvn spring-boot:run
```

**Tab 4: User Service**
```bash
cd user-service
mvn spring-boot:run
```

**Tab 5+**: Start Order, Cart, Inventory in any order.

## 5. Verify
- **Discovery**: Go to `http://localhost:8761`. You should see "product-service", "user-service", "api-gateway" listed.
- **Keycloak**: `http://localhost:8080`.
- **API**: Access via Gateway -> `http://localhost:8080/api/products`.
