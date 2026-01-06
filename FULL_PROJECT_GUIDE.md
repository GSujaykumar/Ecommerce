# 📘 FULL PROJECT DOCUMENTATION & GUIDE

## 🌟 Introduction
This document serves as the **Master Guide** for your Full Stack E-commerce Application. It connects the **React Frontend** with the **Spring Boot Microservices Backend**.

## 🏗️ Architecture Overview

| Component | Technology | Port | Description |
| :--- | :--- | :--- | :--- |
| **Frontend** | React + Vite | `5173` | The User Interface. |
| **API Gateway** | Spring Cloud Gateway | `8080` | Entry point for all API calls. |
| **Auth Server** | Keycloak | `8080` | *Running on /auth or via Docker port map*. |
| **Product Service** | Spring Boot | `8082` | Manages products (MySQL/H2). |
| **User Service** | Spring Boot | `8081` | Manages user profiles. |
| **Cart Service** | Spring Boot | `8083` | Manages shopping carts (Redis). |

---

## 🚀 How to Run The Project (Step-by-Step)

### 1️⃣ Start the Infrastructure (Docker)
This starts the Database, Keycloak, and other tools.
1. Open Terminal in `backend/`.
2. Run: `docker-compose up -d`

### 2️⃣ Start the Backend Services
You need to run these Java applications. You can run them in your IDE or via terminal.

**Option A: Run via IDE (Recommended)**
1. Open `backend/ecommerce-backend` in IntelliJ/VS Code.
2. Locate `DiscoveryServerApplication` -> Run.
3. Locate `ApiGatewayApplication` -> Run.
4. Locate `ProductServiceApplication` -> Run.

**Option B: Run via Terminal**
```bash
# Terminal 1
cd backend/ecommerce-backend/discovery-server
mvn spring-boot:run

# Terminal 2
cd backend/ecommerce-backend/api-gateway
mvn spring-boot:run

# Terminal 3
cd backend/ecommerce-backend/product-service
mvn spring-boot:run
```

### 3️⃣ Start the Frontend
1. Open a new terminal in the root `EcommerceReact/` folder.
2. Run: `npm run dev`
3. Open `http://localhost:5173`.

---

## 🔗 How Frontend Connected to Backend?

I have created a custom Hook: `src/hooks/useProducts.js`.

**The Flow:**
1. React App calls `http://localhost:8080/api/products`.
2. **API Gateway (Port 8080)** receives the request.
3. Gateway looks at its route config: `Path=/api/products/**` -> Routes to `product-service`.
4. **Product Service (Port 8082)** receives request.
5. Controller queries Database -> Returns JSON List of Products.
6. React receives JSON -> Updates State -> Displays Products.

### ⚠️ Common Issues
*   **CORS Error**: If you see this in Chrome Console, make sure `ApiGatewayApplication` is running and has the CORS config I added (allowing origin `*`).
*   **Connection Refused**: Ensure backend is running.
*   **Empty Product List**: The `DataInitializer` class I added automatically creates 4 mock products (iPhone, Galaxy, etc.) when `product-service` starts.

---

## 🛠️ Developer Notes

### Backend Code Location
*   **Product Logic**: `backend/ecommerce-backend/product-service/src/main/java/com/ecommerce/product/`
    *   `model/Product.java`: The database table definition.
    *   `controller/ProductController.java`: The API endpoints.
    *   `repository/ProductRepository.java`: Database access.

### Frontend Code Location
*   **Hook**: `src/hooks/useProducts.js`
*   **Integration**: Open `src/Components/Home.jsx` and import this hook:
    ```javascript
    import useProducts from '../hooks/useProducts';
    const { products, loading, error } = useProducts();
    ```

## 📅 Next Steps
Now that **Product Display** works end-to-end:
1.  **Day 5**: Implement Cart functionality (Frontend "Add to Cart" -> Backend `cart-service`).
2.  **Day 6**: Implement "Checkout" (Frontend -> Gateway -> `order-service`).
