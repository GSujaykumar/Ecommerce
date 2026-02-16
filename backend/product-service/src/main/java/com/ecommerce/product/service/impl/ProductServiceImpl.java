package com.ecommerce.product.service.impl;

import com.ecommerce.product.dto.ProductRequest;
import com.ecommerce.product.dto.ProductResponse;
import com.ecommerce.product.model.Product;
import com.ecommerce.product.repository.ProductRepository;
import com.ecommerce.product.service.ProductService;
import com.ecommerce.product.exception.ProductNotFoundException;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
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
        log.info("Product {} is saved", product.getId());
        return mapToProductResponse(product);
    }

    @Override
    public List<ProductResponse> getAllProducts(String category, String subCategory) {
        log.info("Fetching all products for category: {} and subCategory: {}", category, subCategory);
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
        
        log.info("Found {} products", products.size());
        return products.stream().map(this::mapToProductResponse).toList();
    }

    @Override
    public List<String> getAllCategories() {
        return productRepository.findAllCategories();
    }

    @Override
    public List<String> getSubCategoriesByCategory(String category) {
        log.info("Fetching sub-categories for category: {}", category);
        return productRepository.findDistinctSubCategoriesByCategory(category);
    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Product with id " + id + " not found");
        }
        productRepository.deleteById(id);
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
