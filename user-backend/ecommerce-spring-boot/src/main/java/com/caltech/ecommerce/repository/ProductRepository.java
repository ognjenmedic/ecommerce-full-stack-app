package com.caltech.ecommerce.repository;

import com.caltech.ecommerce.bean.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository <Product, Long> {
    List<Product> findProductsByCategoryCid(Long cid);

    Product findProductBySku(int sku);

    @Query("SELECT p FROM Product p WHERE p.productName LIKE %:query% OR p.description LIKE %:query% ")
    List<Product> searchBySearchTerm(@Param("query") String query);


}
