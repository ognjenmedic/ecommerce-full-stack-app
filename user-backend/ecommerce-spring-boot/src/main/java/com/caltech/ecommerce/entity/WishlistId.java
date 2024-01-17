package com.caltech.ecommerce.entity;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class WishlistId implements Serializable {

    private Long userId;
    private Long productId;

    // Constructors, Getters, and Setters

    public WishlistId() {
    }

    public WishlistId(Long userId, Long productId) {
        this.userId = userId;
        this.productId = productId;
    }

    // Getters and Setters

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

    // equals() and hashCode()

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof WishlistId)) return false;
        WishlistId that = (WishlistId) o;
        return Objects.equals(getUserId(), that.getUserId()) &&
                Objects.equals(getProductId(), that.getProductId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserId(), getProductId());
    }
}
