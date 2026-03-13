# Days 12-14: Microservices Infrastructure

These are the "Glue" services that bind the application together.

## Day 12: Service Discovery (Netflix Eureka)
- **Problem**: In the cloud, IP addresses change dynamically. `order-service` doesn't know where `inventory-service` lives.
- **Solution**: Everyone registers with **Eureka**. Order Service asks Eureka "Where is Inventory?", Eureka replies "192.168.1.5".
- **Setup**: 
    - Add `spring-cloud-starter-netflix-eureka-server`.
    - Annotate main class with `@EnableEurekaServer`.

## Day 13: Config Server
- **Problem**: Update database URL without recompiling code?
- **Solution**: **Spring Cloud Config**. Services fetch their `application.properties` from a Git repository at startup.
- **Setup**: Create `config-server` module.

## Day 14: API Gateway
- **Problem**: Frontend (React) shouldn't need to know port 8081, 8082, 8083...
- **Solution**: Frontend only talks to **Gateway (Port 8080)**. Gateway routes to appropriate service.
- **Security**: The Gateway acts as a bouncer. It checks the Keycloak Token **once**. If valid, pass the request.
