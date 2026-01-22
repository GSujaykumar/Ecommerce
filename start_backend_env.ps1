$ErrorActionPreference = "Stop"

Write-Host "Starting Infrastructure..."
cd backend
docker-compose up -d
Write-Host "Waiting for Kafka & MySQL (20s)..."
Start-Sleep -Seconds 20

$root = "$PSScriptRoot\backend\ecommerce-backend"

function Start-Microservice {
    param([string]$Name)
    Write-Host "Starting $Name..."
    # Start in a new detached window
    Start-Process -FilePath "cmd" -ArgumentList "/c title $Name && mvn spring-boot:run -f $root\$Name\pom.xml"
}

Start-Microservice "discovery-server"
Write-Host "Waiting for Discovery (15s)..."
Start-Sleep -Seconds 15

Start-Microservice "api-gateway"
Start-Microservice "payment-service"
Start-Microservice "notification-service"
Start-Microservice "order-service"
Start-Microservice "inventory-service"
Start-Microservice "product-service"

Write-Host "All backend services launched in separate windows."
Write-Host "To verify Payment & Notification:"
Write-Host "1. Frontend should be running (npm run dev)"
Write-Host "2. Place an order."
Write-Host "3. Check MailDev at http://localhost:1080"
