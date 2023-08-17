package com.caltech.ecommerce.bean;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pid")
    private Long pid;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "sku")
    private int sku;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "description")
    private String description;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "units_in_stock")
    private int unitsInStock;

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public int getSku() {
        return sku;
    }

    public void setSku(int sku) {
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

    public Product(Long pid, int sku, String productName, String imageUrl, String description, BigDecimal unitPrice, int categoryId, String category, int unitsInStock) {
        this.pid = pid;
        this.sku = sku;
        this.productName = productName;
        this.imageUrl = imageUrl;
        this.description = description;
        this.unitPrice = unitPrice;
//        this.categoryId = categoryId;
//        this.category = category;
        this.unitsInStock = unitsInStock;
    }

    public Product() {
    }

    @Override
    public String toString() {
        return "Product{" +
                "pid=" + pid +
                ", sku=" + sku +
                ", productName='" + productName + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", description='" + description + '\'' +
                ", unitPrice=" + unitPrice +
//                ", categoryId=" + categoryId +
                ", category='" + category + '\'' +
                ", unitsInStock=" + unitsInStock +
                '}';
    }
}
