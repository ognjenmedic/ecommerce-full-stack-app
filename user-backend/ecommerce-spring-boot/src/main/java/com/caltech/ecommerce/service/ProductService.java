package com.caltech.ecommerce.service;

import com.caltech.ecommerce.entity.Product;
import com.caltech.ecommerce.dto.ProductDTO;
import com.caltech.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<ProductDTO> findAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsByCategoryId(Long categoryId) {
        return productRepository.findProductsByCategoryId(categoryId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    // Updated to use productId
    public Product getProductById(Long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    // Assuming sku is still relevant and used
    public Product getProductBySku(int sku) {
        return productRepository.findProductBySku(sku);
    }

    public List<Product> searchProductsBySearchTerm(String query) {
        return productRepository.searchBySearchTerm(query);
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
