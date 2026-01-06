# Phase 3: Advanced Operations, Security, and Deployment (Days 15-30)

This guide covers the advanced topics to take your microservices to production level.

## Day 16: Resilience (Circuit Breakers)
If the Inventory Service is down, the Order Service shouldn't crash. It should return a default response ("Check back later").
1. **Add Dependency**: `spring-cloud-starter-circuitbreaker-resilience4j` in Order Service.
2. **Annotation**:
   ```java
   @CircuitBreaker(name = "inventory", fallbackMethod = "fallbackMethod")
   public String checkStock() { ... }
   
   public String fallbackMethod(Exception e) {
       return "Service currently unavailable, please try again.";
   }
   ```

## Day 17: Distributed Tracing
How to debug a request that passed through Gateway -> Order -> Inventory?
1. **Zipkin**: Run Zipkin: `docker run -d -p 9411:9411 openzipkin/zipkin`.
2. **Micrometer**: Add `micrometer-tracing-bridge-brave` and `zipkin-reporter-brave` to all services.
3. **Logs**: Logs will now have a Trace ID. Copy that ID into Zipkin UI to see the full timeline.

## Day 20: Event Driven (Kafka)
Decouple services completely.
1. **Producer (Order Service)**:
   ```java
   kafkaTemplate.send("notificationTopic", new OrderPlacedEvent(orderNumber));
   ```
2. **Consumer (Notification Service)**:
   ```java
   @KafkaListener(topics = "notificationTopic")
   public void handleNotification(OrderPlacedEvent event) {
       // Send email
   }
   ```

## Day 22: Dockerization (How to Containerize)
Create a `Dockerfile` in **each** service directory (e.g., `product-service/Dockerfile`):

```dockerfile
# Start with a base Java image
FROM openjdk:17-jdk-alpine
# Copy the built jar file
COPY target/*.jar app.jar
# Command to run application
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

**Build Image**:
```bash
docker build -t product-service .
```

## Day 25: Kubernetes (The End Game)
Move from Docker Compose to K8s. A standard Deployment looks like this (`product-deployment.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: product-service
spec:
  replicas: 1
  selector:
    matchLabels:
      app: product-service
  template:
    metadata:
      labels:
        app: product-service
    spec:
      containers:
      - name: product-service
        image: product-service:latest
        ports:
        - containerPort: 8082
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: prod
```

## Day 30: Final Checklist
1. All services running?
2. Keycloak secured?
3. Gateway routing correctly?
4. Logs appearing in Zipkin/ELK?
5. Frontend connected to Gateway?

**Congratulations! You have built a production-grade Microservices System.**
