# Fix: All Prometheus Targets Up (All Services Running)

Prometheus shows services as **down** when those containers are **not running**. It scrapes by Docker service name (e.g. `product-service:8082`), so every target must be a running container.

---

## Start all microservices so Prometheus sees them

From the **`backend`** folder run:

```powershell
docker-compose up -d redis mysql zookeeper kafka zipkin prometheus grafana discovery-server api-gateway product-service user-service cart-service order-service payment-service inventory-service notification-service
```

**Or start the full stack (includes Keycloak, RabbitMQ, MailDev, etc.):**

```powershell
docker-compose up -d
```

Wait **2–3 minutes** for discovery and services to register, then in Prometheus (**http://localhost:9090**) run query **`up`** again. All targets that are running should show **1**.

---

## If you don’t need every service

You can start only the ones you want. Prometheus will show **down** for any service you didn’t start; that’s expected.

**Minimum for “most targets up” (no Keycloak):**

- redis, mysql, zipkin, prometheus, grafana  
- discovery-server  
- api-gateway, product-service, user-service, cart-service, order-service, payment-service, inventory-service, notification-service  

**Note:** `user-service` may expect Keycloak. If you don’t start Keycloak, you can leave user-service out and accept it as down in Prometheus.

---

## Check which containers are running

```powershell
docker-compose ps
```

Every service you want to see as **up** in Prometheus must appear here as **Up**. If a service is **Exit** or missing, start it with the commands above or check logs:

```powershell
docker-compose logs product-service
```
