$KEYCLOAK_URL = "http://localhost:8181"
$ADMIN_USER = "admin"
$ADMIN_PASS = "admin"
$REALM_NAME = "ecommerce-realm"
$CLIENT_ID = "ecommerce-client"
$USER_ID = "cb7607ce-9fec-4a40-bac8-7b6bf6421c8c"
$USER_EMAIL = "sujaykumar35577@gmail.com"
$USER_USERNAME = "sujaykumar"
$USER_FULLNAME = "TOBI"

function Get-AdminToken {
    $body = @{
        client_id = "admin-cli"
        username = $ADMIN_USER
        password = $ADMIN_PASS
        grant_type = "password"
    }
    try {
        $response = Invoke-RestMethod -Uri "$KEYCLOAK_URL/realms/master/protocol/openid-connect/token" -Method Post -Body $body
        return $response.access_token
    } catch {
        Write-Host "Waiting for Keycloak..."
        return $null
    }
}

function Create-Realm {
    param($token)
    $headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }
    $body = @{
        id = $REALM_NAME
        realm = $REALM_NAME
        enabled = $true
    } | ConvertTo-Json
    
    try {
        Invoke-RestMethod -Uri "$KEYCLOAK_URL/admin/realms" -Method Post -Body $body -Headers $headers
        Write-Host "Realm created."
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -eq 409) {
            Write-Host "Realm already exists."
        } else {
             Write-Host "Error creating realm: $_"
        }
    }
}

function Create-Client {
    param($token)
    $headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }
    $body = @{
        clientId = $CLIENT_ID
        enabled = $true
        publicClient = $true
        redirectUris = @("*")
        webOrigins = @("*")
        standardFlowEnabled = $true
        directAccessGrantsEnabled = $true
    } | ConvertTo-Json -Depth 10

    try {
        Invoke-RestMethod -Uri "$KEYCLOAK_URL/admin/realms/$REALM_NAME/clients" -Method Post -Body $body -Headers $headers
        Write-Host "Client created."
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -eq 409) {
            Write-Host "Client already exists."
        } else {
             Write-Host "Error creating client: $_"
        }
    }
}

function Create-User {
    param($token)
    $headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }
    $body = @{
        id = $USER_ID
        username = $USER_USERNAME
        email = $USER_EMAIL
        firstName = $USER_FULLNAME
        lastName = ""
        enabled = $true
        emailVerified = $true
        credentials = @(@{type="password"; value="password"; temporary=$false})
    } | ConvertTo-Json -Depth 10

    try {
        Invoke-RestMethod -Uri "$KEYCLOAK_URL/admin/realms/$REALM_NAME/users" -Method Post -Body $body -Headers $headers
        Write-Host "User created."
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -eq 409) {
            Write-Host "User already exists."
        } else {
             Write-Host "Error creating user: $_"
        }
    }
}

Write-Host "Starting Keycloak Configuration..."
for ($i=0; $i -lt 30; $i++) {
    $token = Get-AdminToken
    if ($token) {
        Write-Host "Keycloak connected."
        Create-Realm -token $token
        Create-Client -token $token
        Create-User -token $token
        Write-Host "Configuration Complete."
        exit 0
    }
    Start-Sleep -Seconds 2
}
Write-Host "Keycloak Validation Failed."
exit 1
