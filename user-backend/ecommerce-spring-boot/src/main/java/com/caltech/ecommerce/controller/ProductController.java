package com.caltech.ecommerce.controller;

import com.caltech.ecommerce.dto.ProductDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.caltech.ecommerce.entity.Product;
import com.caltech.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private static final Logger log = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @GetMapping(value = "findAllProducts", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ProductDTO>> findAllProducts() {
        List<ProductDTO> products = productService.findAllProducts();
        log.info("Sending products: {}", products);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/byCategory")
    public ResponseEntity<List<ProductDTO>> getProductsByCategoryId(@RequestParam("categoryId") Long categoryId) {
        List<ProductDTO> products = productService.getProductsByCategoryId(categoryId);
        if (products.isEmpty()) {
            log.info("No products found for category ID: {}", categoryId);
            return ResponseEntity.notFound().build();
        }
        log.info("Sending products for category ID {}: {}", categoryId, products);
        return ResponseEntity.ok(products);
    }

    @GetMapping(value = "/sku/{sku}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProductDTO> getProductBySku(@PathVariable int sku) {
        Product product = productService.getProductBySku(sku);
        if (product == null) {
            log.info("No product found for SKU: {}", sku);
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(convertToDTO(product));
    }

    @GetMapping(value = "/{productId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long productId) {
        Product product = productService.getProductById(productId);
        if (product == null) {
            log.info("No product found for product ID: {}", productId);
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(convertToDTO(product));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchProductsBySearchTerm(@RequestParam("query") String query) {
        List<Product> products = productService.searchProductsBySearchTerm(query);
        List<ProductDTO> productDTOs = products.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productDTOs);
    }

    private ProductDTO convertToDTO(Product product) {
        return new ProductDTO(
                product.getProductId(),
                product.getSku(),
                product.getProductName(),
                product.getImageUrl(),
                product.getDescription(),
                product.getUnitPrice(),
                product.getUnitsInStock(),
                product.getCategory() != null ? product.getCategory().getCategoryId() : null
        );
    }
}

