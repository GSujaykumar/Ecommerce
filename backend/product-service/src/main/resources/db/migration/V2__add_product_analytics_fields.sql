-- Flyway V2: Add performance indexes and audit fields to t_products
ALTER TABLE t_products
    ADD COLUMN IF NOT EXISTS stock_quantity INT DEFAULT 0,
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE,
    ADD COLUMN IF NOT EXISTS view_count BIGINT DEFAULT 0;

-- Index for active products
CREATE INDEX IF NOT EXISTS idx_products_active ON t_products(is_active);
