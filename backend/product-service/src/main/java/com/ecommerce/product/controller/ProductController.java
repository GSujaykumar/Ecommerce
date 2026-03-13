import com.ecommerce.product.service.FileStorageService;
import com.ecommerce.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final FileStorageService fileStorageService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getAllProducts(
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "subCategory", required = false) String subCategory) {
        return productService.getAllProducts(category, subCategory);
    }

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> searchProducts(@RequestParam("q") String query) {
        return productService.searchProducts(query);
    }

    @GetMapping("/categories")
    @ResponseStatus(HttpStatus.OK)
    public List<String> getAllCategories() {
        return productService.getAllCategories();
    }

    @GetMapping("/sub-categories/{category}")
    @ResponseStatus(HttpStatus.OK)
    public List<String> getSubCategories(@PathVariable("category") String category) {
        return productService.getSubCategoriesByCategory(category);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProductResponse getProductById(@PathVariable("id") Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/{id}/social-proof")
    @ResponseStatus(HttpStatus.OK)
    public com.ecommerce.product.dto.SocialProofResponse getSocialProof(@PathVariable("id") Long id) {
        return productService.getSocialProof(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')") // Only ADMINs allowed
    public ProductResponse createProduct(@RequestBody ProductRequest productRequest) {
        return productService.createProduct(productRequest);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public void deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
    }

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public String uploadImage(@RequestParam("file") MultipartFile file) {
        return fileStorageService.uploadFile(file);
    }
}
