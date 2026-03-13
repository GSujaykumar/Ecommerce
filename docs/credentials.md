# E-Commerce Project Credentials

Here is a master list of all the usernames, passwords, and default credentials used across the various services and databases in our E-Commerce microservices project.

## 1. Keycloak (Authentication Server)
- **URL**: http://localhost:8181/admin
- **Username**: `Sujay kumar`
- **Password**: `Sujay kumar`

## 2. MySQL (Database)
- **Port**: `3307` (Mapped to 3306 in Docker)
- **Username**: `root`
- **Password**: `root`
- **Database Name**: `ecommerce`

## 3. Grafana (Monitoring & Dashboards)
- **URL**: http://localhost:3000
- **Username**: `admin`
- **Password**: `admin`

## 4. RabbitMQ (Message Broker AMQP)
- **Management UI URL**: http://localhost:15672
- **Username**: `guest`
- **Password**: `guest`

## 5. MailDev (Local SMTP Server for Notifications)
- **Web UI URL**: http://localhost:1080
- **SMTP Username**: `user`
- **SMTP Password**: `password`

## 6. Frontend / API Test Users (Mock Customers)
- **Email**: `testuser99@gmail.com` (or any email used during tests)
- **Password**: `password123`
*(Note: Since we configured the backend to automatically register new users if they don't exist during login, you can technically use any email and `password123` to instantly create a new test customer account).*

## 7. Keycloak Real Test User (Direct Auth)
- **Email/Username**: `sujaykumar`
- **Password**: `password`
- **Realm**: `ecommerce-realm`
- **Client**: `ecommerce-client`

