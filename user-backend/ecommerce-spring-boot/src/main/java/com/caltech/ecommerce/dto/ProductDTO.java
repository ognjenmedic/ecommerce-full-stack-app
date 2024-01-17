package com.caltech.ecommerce.dto;

import java.math.BigDecimal;

public class ProductDTO {
    private Long productId;
    private String sku;
    private String productName;
    private String imageUrl;
    private String description;
    private BigDecimal unitPrice;
    private int unitsInStock;
    private Long categoryId;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
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

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public ProductDTO() {
    }

    public ProductDTO(Long productId, String sku, String productName, String imageUrl, String description, BigDecimal unitPrice, int unitsInStock, Long categoryId) {
        this.productId = productId;
        this.sku = sku;
        this.productName = productName;
        this.imageUrl = imageUrl;
        this.description = description;
        this.unitPrice = unitPrice;
        this.unitsInStock = unitsInStock;
        this.categoryId = categoryId;
    }

}
