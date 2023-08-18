package com.caltech.ecommerce.service;

import com.caltech.ecommerce.bean.Category;
import com.caltech.ecommerce.bean.Product;
import com.caltech.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    public List<Product> findAllProducts(){
        return productRepository.findAll();
    }

    public List<Product> getProductsByCategoryId(Long cid) { return productRepository.findProductsByCategoryCid(cid);}

    public Product getProductById(int sku) {
        return productRepository.findProductBySku(sku);
    }

    public List<Product> searchProductsBySearchTerm(String searchTerm) {
        return productRepository.searchAllBySearchTerm(searchTerm);
    }

}
