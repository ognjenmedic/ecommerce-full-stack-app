package com.caltech.ecommerce.service;

import com.caltech.ecommerce.entity.Wishlist;
import com.caltech.ecommerce.entity.WishlistId;
import com.caltech.ecommerce.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;

    @Autowired
    public WishlistService(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    // Get all wishlist items for a user
    public List<Wishlist> getWishlistByUserId(Long userId) {
        return wishlistRepository.findByUserId(userId);
    }

    // Add an item to the wishlist
    public Wishlist addToWishlist(Long userId, Long productId) {
        WishlistId wishlistId = new WishlistId(userId, productId);
        Wishlist wishlist = new Wishlist();
        wishlist.setId(wishlistId);
        // Set other necessary fields like User, Product, etc.
        return wishlistRepository.save(wishlist);
    }

    // Remove an item from the wishlist
    public void removeFromWishlist(Long userId, Long productId) {
        wishlistRepository.deleteByIdUserIdAndIdProductId(userId, productId);
    }

    // Check if an item is in the wishlist
    public boolean isItemInWishlist(Long userId, Long productId) {
        Optional<Wishlist> wishlistItem = wishlistRepository.findByIdUserIdAndIdProductId(userId, productId);
        return wishlistItem.isPresent();
    }
}
