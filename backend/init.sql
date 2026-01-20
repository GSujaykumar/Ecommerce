CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- Create table if it might not exist yet (optional, as hibernate handles it, but good for data init persistence)
-- We rely on Hibernate to create the schema usually, but for init data, we might need the table. 
-- However, creating table manually might conflict with Hibernate if definitions mismatch.
-- Best approach: Let Hibernate create the table, then insert. But init.sql runs at container startup, BEFORE Hibernate starts.
-- So we MUST create the table definition here if we want to insert data.
-- Based on User.java:
CREATE TABLE IF NOT EXISTS t_users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255),
    email VARCHAR(255),
    full_name VARCHAR(255),
    keycloak_id VARCHAR(255)
);

-- Insert the data provided by the user
INSERT INTO t_users (id, address, email, full_name, keycloak_id)
VALUES (1, 'My Custom Address', 'sujaykumar35577@gmail.com', 'TOBI', 'cb7607ce-9fec-4a40-bac8-7b6bf6421c8c')
ON DUPLICATE KEY UPDATE 
    address = VALUES(address),
    email = VALUES(email),
    full_name = VALUES(full_name),
    keycloak_id = VALUES(keycloak_id);
