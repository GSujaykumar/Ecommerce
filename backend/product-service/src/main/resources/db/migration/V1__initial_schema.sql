-- Flyway V1: Products table initial schema
CREATE TABLE IF NOT EXISTS t_products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sku_code VARCHAR(100) UNIQUE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(1000),
    category VARCHAR(100),
    sub_category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Index for fast category lookups
CREATE INDEX IF NOT EXISTS idx_products_category ON t_products(category);
CREATE INDEX IF NOT EXISTS idx_products_sub_category ON t_products(sub_category, category);
