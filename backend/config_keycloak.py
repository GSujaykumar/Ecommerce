import requests
import time
import sys

KEYCLOAK_URL = "http://localhost:8181"
ADMIN_USER = "admin"
ADMIN_PASS = "admin"
REALM_NAME = "ecommerce-realm"
CLIENT_ID = "ecommerce-client"
USER_ID = "cb7607ce-9fec-4a40-bac8-7b6bf6421c8c"
USER_EMAIL = "sujaykumar35577@gmail.com"
USER_USERNAME = "sujaykumar"
USER_FULLNAME = "TOBI"

def get_admin_token():
    url = f"{KEYCLOAK_URL}/realms/master/protocol/openid-connect/token"
    data = {
        "client_id": "admin-cli",
        "username": ADMIN_USER,
        "password": ADMIN_PASS,
        "grant_type": "password"
    }
    try:
        response = requests.post(url, data=data)
        if response.status_code == 200:
            return response.json()["access_token"]
    except Exception as e:
        print(f"Error connecting to Keycloak: {e}")
    return None

def create_realm(token):
    url = f"{KEYCLOAK_URL}/admin/realms"
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    payload = {
        "id": REALM_NAME,
        "realm": REALM_NAME,
        "enabled": True
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 201:
        print(f"Realm {REALM_NAME} created.")
        return True
    elif response.status_code == 409:
        print(f"Realm {REALM_NAME} already exists.")
        return True
    else:
        print(f"Failed to create realm: {response.status_code} {response.text}")
        return False

def create_client(token):
    url = f"{KEYCLOAK_URL}/admin/realms/{REALM_NAME}/clients"
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    payload = {
        "clientId": CLIENT_ID,
        "enabled": True,
        "publicClient": True,
        "redirectUris": ["*"],
        "webOrigins": ["*"],
        "standardFlowEnabled": True,
        "directAccessGrantsEnabled": True
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 201:
        print(f"Client {CLIENT_ID} created.")
    elif response.status_code == 409:
        print(f"Client {CLIENT_ID} already exists.")
    else:
        print(f"Failed to create client: {response.status_code} {response.text}")

def create_user(token):
    url = f"{KEYCLOAK_URL}/admin/realms/{REALM_NAME}/users"
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    payload = {
        "id": USER_ID,
        "username": USER_USERNAME,
        "email": USER_EMAIL,
        "firstName": USER_FULLNAME,
        "lastName": "",
        "enabled": True,
        "emailVerified": True,
        "credentials": [{"type": "password", "value": "password", "temporary": False}]
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 201:
        print(f"User {USER_USERNAME} created with ID {USER_ID}.")
    elif response.status_code == 409:
        print(f"User {USER_USERNAME} already exists.")
        # Optionally update password if needed, but skipping for now
    else:
        print(f"Failed to create user: {response.status_code} {response.text}")

def main():
    print("Waiting for Keycloak to be ready...")
    for i in range(30):
        token = get_admin_token()
        if token:
            print("Keycloak is ready.")
            if create_realm(token):
                create_client(token)
                create_user(token)
            return
        time.sleep(2)
    print("Keycloak validation failed after timeout.")

if __name__ == "__main__":
    main()
