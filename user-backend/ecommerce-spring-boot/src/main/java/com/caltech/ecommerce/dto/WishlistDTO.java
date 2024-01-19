package com.caltech.ecommerce.dto;

import java.math.BigDecimal;

public class WishlistDTO {

    private Long userId;
    private Long productId;
    private String productName;
    private String imageUrl;
    private String description;
    private BigDecimal unitPrice;

    public WishlistDTO() {
    }

    public WishlistDTO(Long userId, Long productId, String productName, String imageUrl, String description, BigDecimal unitPrice) {
        this.userId = userId;
        this.productId = productId;
        this.productName = productName;
        this.imageUrl = imageUrl;
        this.description = description;
        this.unitPrice = unitPrice;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
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
}

