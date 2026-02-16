package com.ecommerce.product.repository;

import com.ecommerce.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryIgnoreCase(String category);
    List<Product> findBySubCategoryIgnoreCase(String subCategory);
    List<Product> findByCategoryIgnoreCaseAndSubCategoryIgnoreCase(String category, String subCategory);
    
    @Query("SELECT DISTINCT p.category FROM Product p")
    List<String> findAllCategories();

    @Query("SELECT DISTINCT p.subCategory FROM Product p WHERE LOWER(p.category) = LOWER(:category)")
    List<String> findDistinctSubCategoriesByCategory(String category);

    boolean existsBySkuCode(String skuCode);
}
