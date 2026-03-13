USE ecommerce;
SET FOREIGN_KEY_CHECKS = 0;

-- Clear old data
DELETE FROM t_inventory;
DELETE FROM t_order_line_items;
DELETE FROM t_orders;
DELETE FROM t_products;

ALTER TABLE t_products AUTO_INCREMENT = 1;

-- High Quality Dummy Data
INSERT INTO t_products (name, description, sku_code, price, image_url, category, sub_category) VALUES
-- MEN (LIFESTYLE & WEAR)
('Signature Blue Oxford Shirt', 'Premium long-sleeve oxford shirt in a classic blue hue. Crafted from 100% breathable organic cotton for all-day comfort.', 'MEN_SHIRT_001', 1299.00, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800', 'men', 'shirts'),
('Slim Fit Desert Chinos', 'Versatile and sophisticated chinos in a warm desert beige. Tailored fit that works perfectly for both office and casual weekends.', 'MEN_PANTS_001', 1599.00, 'https://images.unsplash.com/photo-1624371414361-e6e0ed2b2f63?auto=format&fit=crop&q=80&w=800', 'men', 'pants'),
('Classic White Minimalist Tee', 'The essential building block of every wardrobe. Ultra-soft heavy cotton with a modern crew neck and a clean silhouette.', 'MEN_TSHIRT_001', 799.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800', 'men', 't-shirts'),
('Rugged Leather Chelsea Boots', 'Hand-stitched premium brown leather boots with elasticated sides. Durable rubber sole for long-lasting wear and timeless style.', 'MEN_SHOES_001', 4999.00, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800', 'men', 'shoes'),
('Biker Leather Jacket', 'Edgy jet black leather jacket with silver zipper details. A statement piece that adds instant character to any outfit.', 'MEN_JACKET_001', 7499.00, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800', 'men', 'jackets'),

-- WOMEN
('Emerald Silk Evening Dress', 'Breathtaking floor-length silk gown in a deep emerald green. Features a subtle side slit and elegant draped neckline.', 'WOMEN_DRESS_001', 4499.00, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800', 'women', 'dresses'),
('Floral Summer Midi Dress', 'Bright and airy summer dress with a vibrant floral pattern. Light chiffon fabric that flows beautifully as you walk.', 'WOMEN_DRESS_002', 2899.00, 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800', 'women', 'dresses'),
('Quilted Leather Crossbody', 'Luxury quilted handbag in matte black with a golden chain strap. The perfect companion for both day and night.', 'WOMEN_ACC_001', 3200.00, 'https://images.unsplash.com/photo-1584917033904-491bb74bb739?auto=format&fit=crop&q=80&w=800', 'women', 'accessories'),
('Knitted Cashmere Sweater', 'Ultra-luxurious beige cashmere sweater. Soft against the skin and providing unmatched warmth for chilly days.', 'WOMEN_TOP_001', 5999.00, 'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?auto=format&fit=crop&q=80&w=800', 'women', 'tops'),
('Stiletto Suede Heels', 'Classic nude suede heels with a sleek pointed toe. Designed for comfort and high-fashion appeal.', 'WOMEN_SHOES_001', 3499.00, 'https://images.unsplash.com/photo-1543163521-1bf539c35dd6?auto=format&fit=crop&q=80&w=800', 'women', 'shoes'),

-- ELECTRONICS
('Apex Wireless Headphones', 'Experience studio-quality sound with active noise cancellation and 40-hour battery life. Midnight black finish.', 'ELEC_001', 28967.00, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', 'electronics', 'audio'),
('Minimalist Smart Watch', 'Track your fitness, sleep, and notifications with this elegant stainless steel smartwatch. Water-resistant and stylish.', 'ELEC_002', 15499.00, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', 'electronics', 'wearables'),
('Mechanical Pro Keyboard', 'Ultra-responsive mechanical switches with customizable RGB lighting and a sleek aluminum frame.', 'ELEC_003', 8999.00, 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800', 'electronics', 'peripherals'),

-- HOME
('Sage Ceramic Table Lamp', 'Aesthetic and functional lighting with a sage green ceramic base and a textured linen shade.', 'HOME_001', 2499.00, 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800', 'home', 'lighting'),
('Luxe Cotton Towel Set', 'Set of 4 plush, hotel-quality towels in charcoal gray. Highly absorbent and soft on the skin.', 'HOME_002', 1899.00, 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&q=80&w=800', 'home', 'bath'),
('Handcrafted Ceramic Mug', 'Individually crafted ceramic mug with a unique speckled glaze. Perfect for your morning coffee or tea.', 'HOME_003', 599.00, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800', 'home', 'kitchen'),

-- KIDS
('Cuddly Bear Plush', 'Super soft and hypoallergenic teddy bear for kids of all ages. The perfect gift for a little one.', 'KIDS_TOY_001', 899.00, 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&q=80&w=800', 'kids', 'toys'),
('Dino Explorer T-Shirt', 'Fun and colorful dinosaur graphic t-shirt in bright yellow cotton.', 'KIDS_CLOTH_001', 499.00, 'https://images.unsplash.com/photo-1519235106638-30cc49b4f910?auto=format&fit=crop&q=80&w=800', 'kids', 'clothing');

-- Re-populate Inventory
INSERT INTO t_inventory (sku_code, quantity)
SELECT sku_code, 100 FROM t_products;

SET FOREIGN_KEY_CHECKS = 1;
