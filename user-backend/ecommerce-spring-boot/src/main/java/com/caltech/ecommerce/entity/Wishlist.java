package com.caltech.ecommerce.entity;

import javax.persistence.*;

@Entity
@Table(name = "wishlist")
public class Wishlist {

    @EmbeddedId
    private WishlistId id;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Constructors, Getters, Setters

    public Wishlist() {
    }

    public Wishlist(WishlistId id, Product product, User user) {
        this.id = id;
        this.product = product;
        this.user = user;
    }

    public WishlistId getId() {
        return id;
    }

    public void setId(WishlistId id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // toString()

    @Override
    public String toString() {
        return "Wishlist{" +
                "id=" + id +
                ", product=" + (product != null ? product.getProductId() : "null") +
                ", user=" + (user != null ? user.getUserId() : "null") +
                '}';
    }

}