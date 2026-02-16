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

-- Based on Product.java
CREATE TABLE IF NOT EXISTS t_products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    sku_code VARCHAR(255),
    price DECIMAL(19, 2),
    image_url TEXT,
    category VARCHAR(255),
    sub_category VARCHAR(255)
);

-- Based on Inventory.java
CREATE TABLE IF NOT EXISTS t_inventory (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sku_code VARCHAR(255),
    quantity INT
);

-- Insert User Data
INSERT INTO t_users (id, address, email, full_name, keycloak_id)
VALUES (1, 'My Custom Address', 'sujaykumar35577@gmail.com', 'TOBI', 'cb7607ce-9fec-4a40-bac8-7b6bf6421c8c')
ON DUPLICATE KEY UPDATE 
    address = VALUES(address),
    email = VALUES(email),
    full_name = VALUES(full_name),
    keycloak_id = VALUES(keycloak_id);

-- Insert Product Data
INSERT INTO t_products (name, description, sku_code, price, image_url, category, sub_category) VALUES
-- Men's Category
('Premium Cotton Shirt', 'High-quality cotton shirt for formal and casual wear.', 'MEN_SHIRT_001', 1299.00, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500', 'men', 'shirts'),
('Slim Fit Chinos', 'Comfortable slim fit chinos for everyday style.', 'MEN_PANTS_001', 1599.00, 'https://images.unsplash.com/photo-1624371414361-e6e0ed2b2f63?w=500', 'men', 'pants'),
('Graphic T-Shirt', 'Cool graphic t-shirt made of 100% organic cotton.', 'MEN_TSHIRT_001', 799.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 'men', 't-shirts'),
('Classic Leather Shoes', 'Elegant leather shoes for any formal occasion.', 'MEN_SHOES_001', 2499.00, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', 'men', 'shoes'),
('Comfort Slippers', 'Soft and comfortable slippers for home use.', 'MEN_SLIPPERS_001', 499.00, 'https://images.unsplash.com/photo-1603487788363-241c8f498967?w=500', 'men', 'slippers'),

-- Women's Category
('Floral Summer Dress', 'Beautiful floral dress perfect for summer outings.', 'WOMEN_DRESS_001', 1899.00, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500', 'women', 'dresses'),
('Designer Handbag', 'Premium leather handbag for the modern woman.', 'WOMEN_BAG_001', 3500.00, 'https://images.unsplash.com/photo-1584917033904-491bb74bb739?w=500', 'women', 'accessories'),

-- Kids Category
('Cartoon Print T-Shirt', 'Fun and colorful t-shirt for kids.', 'KIDS_TSHIRT_001', 450.00, 'https://images.unsplash.com/photo-1519235106638-30cc49b4f910?w=500', 'kids', 'clothing');

-- Insert Inventory Data
INSERT INTO t_inventory (sku_code, quantity) VALUES
('MEN_SHIRT_001', 100),
('MEN_PANTS_001', 80),
('MEN_TSHIRT_001', 150),
('MEN_SHOES_001', 50),
('MEN_SLIPPERS_001', 200),
('WOMEN_DRESS_001', 60),
('WOMEN_BAG_001', 30),
('KIDS_TSHIRT_001', 120);
