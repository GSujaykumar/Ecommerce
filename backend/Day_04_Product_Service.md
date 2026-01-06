# Day 4: Product Service Setup

The **Product Service** manages our catalog: Products, Categories, Prices, and Inventory references.

## 🔨 Implementation Steps

### 1. Create Module
Similiar to User Service, we create a `product-service` module.

### 2. Dependencies
- `spring-boot-starter-web`
- `spring-boot-starter-data-jpa` (To talk to a database)
- `h2` or `postgresql` (Database driver)
- `spring-boot-starter-oauth2-resource-server` (To secure admin routes)

### 3. Key Concepts
- **Public Endpoints**: Viewing products (`GET /api/products`) should be open to everyone (no login required).
- **Protected Endpoints**: Creating/Deleting products (`POST /api/products`) requires `ADMIN` role.

### 4. Code Structure
- **Entity**: `Product.java` (id, name, description, price, imageUrl).
- **Repository**: `ProductRepository.java`.
- **Service**: `ProductService.java` (Business logic).
- **Controller**: `ProductController.java`.

## 📝 Entity Design
```java
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String skuCode;
}
```

## 🧪 Testing
1. Run Keycloak (Day 2).
2. Run User Service (Day 3).
3. Run Product Service (Day 4) on Port `8082`.
4. Try to `POST` a product without a token -> **401 Unauthorized**.
