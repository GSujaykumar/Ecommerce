# Day 2: Keycloak Setup & Integration

Identity management is complex. Instead of building our own login system from scratch (which is risky), we use **Keycloak**. It handles user registration, login, password recovery, and role management for us.

## 🐳 Step 1: Run Keycloak with Docker
The easiest way to run Keycloak is using a container. I have included a `docker-compose.yml` file in the `backend` folder.

1.  Navigate to `backend/`.
2.  Run the following command:
    ```bash
    docker-compose up -d
    ```
3.  Wait for it to start. You can access the console at `http://localhost:8080`.
    *   **Username**: `admin`
    *   **Password**: `admin`

## ⚙️ Step 2: Configure Keycloak

### 1. Create a Realm
A "Realm" is like a tenant or a space for your app.
1.  Log in to the Admin Console.
2.  Hover over the top-left dropdown (it says "Master").
3.  Click **Create Realm**.
4.  Name: `ecommerce-realm`.
5.  Click **Create**.

### 2. Create a Client
Our Spring Boot microservices need a way to talk to Keycloak. We create a "Client" for them.
1.  Go to **Clients** (left menu) -> **Create Client**.
2.  **Client ID**: `ecommerce-app`.
3.  **Client authentication**: `On` (we need a secret).
4.  **Authorization**: `Off` (for now).
5.  **Standard Flow**: `On` (Standard OAuth2 login).
6.  **Direct Access Grants**: `On` (For testing with Postman easily).
7.  **Valid Redirect URIs**: `*` (For development only; allows redirection anywhere).
8.  Click **Save**.

### 3. Get User Credentials
1.  Go to the **Credentials** tab of the `ecommerce-app` client.
2.  Copy the **Client Secret**. We will need this for our Spring Boot apps later.

### 4. Create Roles
1.  Go to **Realm Roles**.
2.  Create Role -> Name: `USER`.
3.  Create Role -> Name: `ADMIN`.

### 5. Create a Test User
1.  Go to **Users** -> **Add user**.
2.  Username: `testuser`.
3.  Click **Create**.
4.  Go to the **Credentials** tab (for the user).
5.  Set Password: `password` (Toggle "Temporary" to **Off**).
6.  Go to **Role Mapping**.
7.  Assign the `USER` role.

---
You now have a fully functional Authentication Server running!
