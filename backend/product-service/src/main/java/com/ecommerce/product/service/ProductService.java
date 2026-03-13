package com.ecommerce.product.service;

import com.ecommerce.product.dto.ProductRequest;
import com.ecommerce.product.dto.ProductResponse;
import com.ecommerce.product.dto.SocialProofResponse;
import java.util.List;

public interface ProductService {
    ProductResponse createProduct(ProductRequest productRequest);
    List<ProductResponse> getAllProducts(String category, String subCategory);
    List<String> getAllCategories();
    List<String> getSubCategoriesByCategory(String category);
    ProductResponse getProductById(Long id);
    void deleteProduct(Long id);
    SocialProofResponse getSocialProof(Long id);
    List<ProductResponse> searchProducts(String query);
}
