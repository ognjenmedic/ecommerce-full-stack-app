package com.caltech.ecommerce.repository;

import com.caltech.ecommerce.bean.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository <Product, Long> {
    List<Product> findProductsByCategoryCid(Long cid);

    Product findProductBySku(int sku);

    List<Product> searchAllBySearchTerm(String searchTerm);

}
