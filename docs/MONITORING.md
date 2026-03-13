# E-Commerce Monitoring & Observability

This document describes how to **log in** and use **Swagger**, **Prometheus**, **Grafana**, and **Zipkin** for the e-commerce microservices stack.

---

## 1. Swagger (OpenAPI) — API documentation

**No login required.** Swagger UI is open by default for development.

### URLs (when services run locally)

| Service            | Port | Swagger UI URL                          |
|--------------------|------|-----------------------------------------|
| User Service       | 8081 | http://localhost:8081/swagger-ui.html  |
| Product Service    | 8082 | http://localhost:8082/swagger-ui.html  |
| Cart Service       | 8084 | http://localhost:8084/swagger-ui.html  |
| Order Service      | 8083 | http://localhost:8083/swagger-ui.html  |
| Payment Service    | 8085 | http://localhost:8085/swagger-ui.html  |
| Inventory Service  | 8086 | http://localhost:8086/swagger-ui.html  |
| Notification Svc   | 8087 | http://localhost:8087/swagger-ui.html  |

### With Docker Compose

Use the **service name** and internal port (e.g. from another container or after port-mapping):

- Product: `http://localhost:8082/swagger-ui.html` (if port 8082 is mapped)
- Cart: `http://localhost:8084/swagger-ui.html` (if port 8084 is mapped)

If you use the API Gateway, routes are under `/api/<service-path>`; Swagger is served by each service directly, not via the gateway.

### What to do in Swagger

1. Open the URL in a browser.
2. You see the list of endpoints (e.g. GET/POST `/api/products`).
3. Click **Try it out** on an endpoint, fill parameters/body, then **Execute**.
4. Check the response and status code.

No authentication is configured in Swagger by default; if your API uses Keycloak/JWT, add a security scheme in OpenAPI or send the Bearer token in the request.

---

## 2. Prometheus — Metrics

**No login.** Prometheus is read-only and has no built-in login.

### URL

- **Local:** http://localhost:9090  
- **Docker:** http://localhost:9090 (mapped in `docker-compose`)

### What to do

1. Open the Prometheus UI.
2. Use the **Graph** tab.
3. In the query box, try for example:
   - `up` — which targets are up (1) or down (0)
   - `rate(http_server_requests_seconds_count[5m])` — HTTP request rate
   - `jvm_memory_used_bytes{area="heap"}` — JVM heap usage
4. Click **Execute** then **Graph** to see the time series.

Scrape config is in `prometheus.yml`; each microservice exposes `/actuator/prometheus`.

---

## 3. Grafana — Dashboards & visualization

**Login required.**

### Default login

- **URL:** http://localhost:3000  
- **Username:** `admin`  
- **Password:** `admin`  

(Grafana will ask you to change the password on first login; you can skip or set a new one.)

### What to do after login

1. **Datasource:** Prometheus is pre-provisioned (see `grafana/provisioning/datasources/datasources.yml`).  
   - **Configuration → Data sources** — you should see **Prometheus** as default.

2. **Pre-loaded dashboard:**  
   - **Dashboards → E-Commerce → E-Commerce Microservices Overview**  
   - Shows HTTP request rate by service, JVM heap used, and service “up” status (from `up` in Prometheus).

3. **Create a new dashboard:**  
   - **+ → Dashboard → Add visualization**  
   - Select **Prometheus** and write a query (e.g. `up`, or `rate(http_server_requests_seconds_count[5m])`).

4. **Explore:**  
   - **Explore** (compass icon) → choose **Prometheus** and run ad-hoc queries.

---

## 4. Zipkin — Distributed tracing

**No login.** Zipkin UI is open by default.

### URL

- **Local:** http://localhost:9411  
- **Docker:** http://localhost:9411  

### What to do

1. Open the Zipkin UI in the browser.
2. Optionally set a **Service Name** (e.g. `product-service` or leave blank for all).
3. Click **Run Query** to list recent traces.
4. Click **Show** on a trace to see the full span tree (gateway → product-service → … and timings).

Traces are sent from each microservice (and API Gateway) to Zipkin when `management.tracing.sampling.probability=1.0` and `management.tracing.export.zipkin.endpoint` is set (e.g. via `SPRING_ZIPKIN_BASE_URL` in Docker). Generate some API traffic (e.g. via Swagger or the React app) to see traces.

---

## Quick reference

| Tool       | URL              | Login              |
|------------|------------------|--------------------|
| Swagger    | :8081–8087/swagger-ui.html (per service) | No                 |
| Prometheus | http://localhost:9090  | No                 |
| Grafana    | http://localhost:3000  | admin / admin      |
| Zipkin     | http://localhost:9411  | No                 |

---

## Running the monitoring stack (Docker)

From the `backend` directory:

```bash
docker compose up -d prometheus zipkin grafana
```

Then start your microservices (and optionally API Gateway). Ensure each service has:

- `management.endpoints.web.exposure.include` including `prometheus` and `health`
- Zipkin endpoint set (e.g. `SPRING_ZIPKIN_BASE_URL=http://zipkin:9411` in Docker).

After that you can:

- **Log in to Grafana** with admin/admin and use the E-Commerce Microservices Overview dashboard.
- **Open Prometheus** and run queries.
- **Open Zipkin** and run a query to see traces.
- **Open each service’s Swagger UI** on its port to try APIs.
