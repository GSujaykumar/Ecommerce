# How to Use Swagger, Prometheus, Grafana, Zipkin

The URLs **only work when the services are running**. Follow these steps.

---

## Step 1: Start the services (required)

Open a terminal, go to the **`backend`** folder (only if you're not already there), then run Docker.

**PowerShell (Windows):** Use `docker-compose` (with hyphen). If you're already in `backend`, don't run `cd backend` again.

### Option A – Only monitoring (Prometheus, Grafana, Zipkin)

Use this to try the monitoring tools without running all microservices:

```powershell
# Only if you're in E-Commerce-Project root:
cd backend

docker-compose up -d redis mysql zipkin prometheus grafana
```

Then wait ~30 seconds and open:

- **Prometheus:** http://localhost:9090  
- **Grafana:** http://localhost:3000 (login: **admin** / **admin**)  
- **Zipkin:** http://localhost:9411  

Swagger will **not** work yet (no app services running).

### Option B – Monitoring + one service (to test Swagger too)

```powershell
# Only if you're in E-Commerce-Project root:
cd backend

docker-compose up -d redis mysql zipkin prometheus grafana discovery-server product-service
```

Wait 1–2 minutes for discovery and product-service to start. Then open:

- **Swagger (Product):** http://localhost:8082/swagger-ui.html  
- **Prometheus:** http://localhost:9090  
- **Grafana:** http://localhost:3000 (login: **admin** / **admin**)  
- **Zipkin:** http://localhost:9411  

### Option C – Full stack (all services)

```powershell
# Only if you're in E-Commerce-Project root:
cd backend

docker-compose up -d
```

Wait 2–3 minutes, then all these work:

| What      | URL |
|-----------|-----|
| Swagger – User | http://localhost:8081/swagger-ui.html |
| Swagger – Product | http://localhost:8082/swagger-ui.html |
| Swagger – Cart | http://localhost:8084/swagger-ui.html |
| Swagger – Order | http://localhost:8083/swagger-ui.html |
| Swagger – Payment | http://localhost:8085/swagger-ui.html |
| Swagger – Inventory | http://localhost:8086/swagger-ui.html |
| Swagger – Notification | http://localhost:8087/swagger-ui.html |
| Prometheus | http://localhost:9090 |
| Grafana | http://localhost:3000 |
| Zipkin | http://localhost:9411 |

---

## Step 2: Open URLs in your browser

- Use your **system browser** (Chrome, Edge, Firefox) and type the URL in the address bar (e.g. `http://localhost:3000`).
- If a URL does not open inside Cursor, copy it and paste it into Chrome/Edge; localhost works from your machine.

---

## Step 3: Check that containers are running

```powershell
# From backend folder:
docker-compose ps
```

You should see `Up` for the services you started. If a service is `Exit` or missing, check logs:

```powershell
docker-compose logs product-service
docker-compose logs grafana
```

---

## Quick reference

| Tool       | URL                    | Login        |
|------------|------------------------|-------------|
| Swagger    | http://localhost:8081 … 8087/swagger-ui.html (per service) | No          |
| Prometheus | http://localhost:9090   | No          |
| Grafana    | http://localhost:3000   | admin / admin |
| Zipkin     | http://localhost:9411   | No          |

**If a URL does not load:** the service is not running. Start it with Option A, B, or C above.
