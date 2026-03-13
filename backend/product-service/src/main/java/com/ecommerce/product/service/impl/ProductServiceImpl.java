package com.ecommerce.product.service.impl;

import com.ecommerce.product.dto.ProductRequest;
import com.ecommerce.product.dto.ProductResponse;
import com.ecommerce.product.dto.SocialProofResponse;
import com.ecommerce.product.model.Product;
import com.ecommerce.product.repository.ProductRepository;
import com.ecommerce.product.service.ProductService;
import com.ecommerce.product.exception.ProductNotFoundException;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final StringRedisTemplate redisTemplate;

    @Override
    @Caching(evict = {
        @CacheEvict(value = "products", allEntries = true),
        @CacheEvict(value = "categories", allEntries = true)
    })
    public ProductResponse createProduct(ProductRequest productRequest) {
        Product product = Product.builder()
                .name(productRequest.name())
                .description(productRequest.description())
                .skuCode(productRequest.skuCode())
                .price(productRequest.price())
                .imageUrl(productRequest.imageUrl())
                .category(productRequest.category())
                .subCategory(productRequest.subCategory())
                .build();

        productRepository.save(product);
        log.info("Product {} is saved and cache evicted", product.getId());
        return mapToProductResponse(product);
    }

    @Override
    @Cacheable(value = "products", key = "#category + '-' + #subCategory")
    public List<ProductResponse> getAllProducts(String category, String subCategory) {
        log.info("CACHE MISS — Fetching from DB for category: {}, subCategory: {}", category, subCategory);
        List<Product> products;

        if (category != null && !category.isEmpty() && subCategory != null && !subCategory.isEmpty()) {
            products = productRepository.findByCategoryIgnoreCaseAndSubCategoryIgnoreCase(category, subCategory);
        } else if (category != null && !category.isEmpty()) {
            products = productRepository.findByCategoryIgnoreCase(category);
        } else if (subCategory != null && !subCategory.isEmpty()) {
            products = productRepository.findBySubCategoryIgnoreCase(subCategory);
        } else {
            products = productRepository.findAll();
        }

        log.info("Found {} products, caching result", products.size());
        return products.stream().map(this::mapToProductResponse).toList();
    }

    @Override
    @Cacheable(value = "categories")
    public List<String> getAllCategories() {
        log.info("CACHE MISS — Fetching categories from DB");
        return productRepository.findAllCategories();
    }

    @Override
    @Cacheable(value = "sub-categories", key = "#category")
    public List<String> getSubCategoriesByCategory(String category) {
        log.info("CACHE MISS — Fetching sub-categories for category: {}", category);
        return productRepository.findDistinctSubCategoriesByCategory(category);
    }

    @Override
    @Cacheable(value = "product", key = "#id")
    public ProductResponse getProductById(Long id) {
        log.info("CACHE MISS — Fetching product {} from DB", id);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with id " + id + " not found"));
        return mapToProductResponse(product);
    }

    @Override
    @Caching(evict = {
        @CacheEvict(value = "product", key = "#id"),
        @CacheEvict(value = "products", allEntries = true),
        @CacheEvict(value = "categories", allEntries = true)
    })
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Product with id " + id + " not found");
        }
        productRepository.deleteById(id);
        log.info("Product {} deleted and cache evicted", id);
    }

    @Override
    public SocialProofResponse getSocialProof(Long id) {
        String key = "social:viewers:product:" + id;
        
        // Increment visual view counter in Redis
        Long viewers = redisTemplate.opsForValue().increment(key);
        if (viewers == null) viewers = 1L;
        
        // Set an expiry so viewers "fall off" automatically after 10 mins representing true live sessions
        if (viewers == 1L) {
            redisTemplate.expire(key, 10, TimeUnit.MINUTES);
        } else {
            // Add a little randomness so it feels hyper-active (jitter between -1 and +3)
            viewers += (long)(Math.random() * 4) - 1;
            if (viewers < 1) viewers = 1L;
        }

        // Simulate a "Just bought" ticker
        String[] purchasedTimes = {"2 mins ago", "12 mins ago", "Just now!", "1 hour ago", "Currently in 3 carts!"};
        String recentPurchase = purchasedTimes[(int)(Math.random() * purchasedTimes.length)];

        // Simulate low stock alert for hype
        int stockLeft = (int)(Math.random() * 10) + 1; // 1 to 10 left

        return new SocialProofResponse(id, viewers.intValue(), stockLeft, recentPurchase);
    }

    @Override
    public List<ProductResponse> searchProducts(String query) {
        log.info("High-speed instant search query: {}", query);
        List<Product> products = productRepository.findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(query, query);
        return products.stream().map(this::mapToProductResponse).toList();
    }

    private ProductResponse mapToProductResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getSkuCode(),
                product.getPrice(),
                product.getImageUrl(),
                product.getCategory(),
                product.getSubCategory()
        );
    }
}
