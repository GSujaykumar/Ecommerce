# Step-by-Step: How to Use Each Monitoring Tool

Follow these steps one by one. Make sure your Docker containers are running first.

---

## 1. Grafana (Login required)

### 1.1 Open Grafana
- Open your browser (Chrome, Edge, Firefox).
- Type in the address bar: **http://localhost:3000**
- Press Enter.

### 1.2 Log in
- **Username:** type `admin`
- **Password:** type `admin`
- Click **Log in**.
- If it asks "Update your password" or "Change password", you can click **Skip** (or set a new password if you prefer).

### 1.3 See the dashboard
- On the left sidebar, click the **☰** (hamburger menu) if you don’t see the menu.
- Click **Dashboards**.
- Under "E-Commerce", click **E-Commerce Microservices Overview**.
- You’ll see panels with **HTTP request rate**, **JVM heap used**, and **Service up**.
- If a panel says "No data", wait a minute and refresh the page, or generate some traffic by calling an API (see Swagger below).

### 1.4 Run a quick query (optional)
- Click **Explore** (compass icon) in the left sidebar.
- At the top, make sure **Prometheus** is selected.
- In the query box type: `up`
- Click **Run query**.
- You should see which services are up (value 1) or down (value 0).

---

## 2. Swagger (No login)

### 2.1 Open Swagger
- In your browser go to: **http://localhost:8082/swagger-ui.html**
- Press Enter.

### 2.2 Use an API
- You’ll see a list of endpoints (e.g.  **product-controller** with GET, POST, etc.).
- Click **GET** on something like **/api/products** (or the path your Product Service uses).
- Click **Try it out**.
- (If there are parameters, you can leave defaults or fill them.)
- Click **Execute**.
- Scroll down to **Response body** to see the result (e.g. list of products) and **Response code** (e.g. 200).

Doing this also generates traffic that Prometheus and Zipkin can show.

---

## 3. Prometheus (No login)

### 3.1 Open Prometheus
- In your browser go to: **http://localhost:9090**
- Press Enter.

### 3.2 Run a query
- You’ll see a search box and a **Execute** button.
- In the query box type: **`up`**
- Click **Execute**.
- Below you’ll see a **Table** with your targets (e.g. product-service, api-gateway). **1** = up, **0** = down.

### 3.3 See a graph
- After running a query, click the **Graph** tab (next to Table).
- You’ll see a time-series graph.
- Try another query, e.g.: **`rate(http_server_requests_seconds_count[5m])`** then **Execute** to see request rate (you may need to generate traffic via Swagger first).

---

## 4. Zipkin (No login)

### 4.1 Open Zipkin
- In your browser go to: **http://localhost:9411**
- Press Enter.

### 4.2 See traces
- You’ll see a search form with **Service Name**, **Start time**, etc.
- Leave everything as default and click **Run Query** (or **Find Traces**).
- If there is traffic, you’ll see a list of **traces** (each is one request flowing through your services).
- Click **Show** or a trace to see the full timeline (which service took how long).

### 4.3 If you see "No traces"
- Traces appear only after you send requests.
- Go to **Swagger** (http://localhost:8082/swagger-ui.html) and **Execute** a few API calls (e.g. GET products).
- Wait 5–10 seconds, then go back to Zipkin and click **Run Query** again.

---

## Quick reference

| Tool      | URL                         | Login      | What you do |
|-----------|-----------------------------|------------|-------------|
| Grafana   | http://localhost:3000       | admin / admin | Log in → Dashboards → E-Commerce Overview |
| Swagger   | http://localhost:8082/swagger-ui.html | No        | Open endpoint → Try it out → Execute |
| Prometheus| http://localhost:9090       | No         | Type `up` → Execute → see Table/Graph |
| Zipkin    | http://localhost:9411       | No         | Run Query → click Show on a trace |

---

## If something doesn’t work

- **Page won’t load:** Check that Docker is running and you started the stack:
  ```powershell
  docker-compose ps
  ```
  All listed services should show **Up**.

- **Prometheus: most services “down”, only api-gateway and Prometheus up:**  
  Prometheus only scrapes **running** containers. Start the missing microservices (see **backend/PROMETHEUS_ALL_SERVICES_UP.md**) or run the full stack:
  ```powershell
  docker-compose up -d
  ```
  Wait 2–3 minutes, then in Prometheus run the `up` query again.

- **Grafana “admin/admin” doesn’t work:** Try the same in a private/incognito window, or reset Grafana by removing its volume and starting again.

- **Zipkin always “No traces”:** Call the API a few times from Swagger, wait a few seconds, then query Zipkin again.

If you tell me which tool you’re on (Grafana, Swagger, Prometheus, or Zipkin) and what you see on the screen, I can give you the exact next click.
