package com.caltech.ecommerce.dto;

import java.math.BigDecimal;


public class CartItemDTO {
    private Long productId;
    private int quantity;
    private String productName;
    private String imageUrl;
    private String description;
    private BigDecimal unitPrice;

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


    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public CartItemDTO() {
    }

    public CartItemDTO(Long productId, int quantity, String productName, String imageUrl, String description, BigDecimal unitPrice) {
        this.productId = productId;
        this.quantity = quantity;
        this.productName = productName;
        this.imageUrl = imageUrl;
        this.description = description;
        this.unitPrice = unitPrice;
    }
}
