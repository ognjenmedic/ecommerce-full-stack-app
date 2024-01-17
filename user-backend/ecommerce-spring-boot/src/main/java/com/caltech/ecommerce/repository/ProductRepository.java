package com.caltech.ecommerce.repository;

import com.caltech.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.category.categoryId = :categoryId")
    List<Product> findProductsByCategoryId(@Param("categoryId") Long categoryId);


    Product findProductBySku(int sku);

    @Query("SELECT p FROM Product p WHERE p.productName LIKE %:query% OR p.description LIKE %:query% ")
    List<Product> searchBySearchTerm(@Param("query") String query);
}
