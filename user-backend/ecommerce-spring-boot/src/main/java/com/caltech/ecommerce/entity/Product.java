package com.caltech.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "products"})
    private Category category;



    @Column(name = "sku")
    private String sku;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "units_in_stock")
    private int unitsInStock;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getUnitsInStock() {
        return unitsInStock;
    }

    public void setUnitsInStock(int unitsInStock) {
        this.unitsInStock = unitsInStock;
    }

    public Product() {
    }

    public Product(Long productId, String sku, String productName, String imageUrl, String description, BigDecimal unitPrice, Category category, int unitsInStock) {
        this.productId = productId;
        this.sku = sku;
        this.productName = productName;
        this.imageUrl = imageUrl;
        this.description = description;
        this.unitPrice = unitPrice;
        this.category = category;
        this.unitsInStock = unitsInStock;
    }

    @Override
    public String toString() {
        return "Product{" +
                "productId=" + productId +
                ", sku=" + sku +
                ", productName='" + productName + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", description='" + description + '\'' +
                ", unitPrice=" + unitPrice +
                ", category=" + category +
                ", unitsInStock=" + unitsInStock +
                '}';
    }
}
