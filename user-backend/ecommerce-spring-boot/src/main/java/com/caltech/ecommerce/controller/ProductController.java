package com.caltech.ecommerce.controller;

import com.caltech.ecommerce.bean.Product;
import com.caltech.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping(value = "findAllProducts", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Product> findAllProducts(){
        return productService.findAllProducts();
    }

    @GetMapping
    public List<Product> getProductsByCategoryId(@RequestParam("categoryId") Long cid) {
        return productService.getProductsByCategoryId(cid);
    }

    @GetMapping(value = "{sku}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Product getProductById(@PathVariable int sku){
        return productService.getProductById(sku);
    }
}
