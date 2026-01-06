# Day 3: User Service Setup

The **User Service** is responsible for managing user data. While Keycloak handles *authentication* (checking who you are), the User Service handles *business logic* (profiles, addresses, preferences).

## 🔨 Implementation Steps

### 1. Create Module
We have created the `user-service` folder inside `ecommerce-backend`.

### 2. Dependencies (POM)
We added `spring-boot-starter-web` for creating REST APIs and `spring-boot-starter-oauth2-resource-server` to secure them using Keycloak.

### 3. Application Properties
Configuration in `src/main/resources/application.properties`:
- **Server Port**: `8081` (Standard practice: 8080 is Keycloak, 8081 is User, 8082 Product...)
- **Security**: Points to our local Keycloak instance to validate tokens.

### 4. Code Structure
- **`controller/UserController.java`**: The entry point for API requests.
- **`model/User.java`**: The data shape.
- **`repository/UserRepository.java`**: Data access layer (JPA).

## 🧪 Testing
Once running, you should be able to hit `http://localhost:8081/api/users` but receive a **401 Unauthorized** error. You need a valid JWT token from Keycloak (Day 14 covers Gateway integration which simplifies this, but for now we test direct security).
