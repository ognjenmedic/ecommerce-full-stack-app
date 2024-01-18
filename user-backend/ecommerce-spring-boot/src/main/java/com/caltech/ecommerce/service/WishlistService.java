package com.caltech.ecommerce.service;

import com.caltech.ecommerce.entity.Wishlist;
import com.caltech.ecommerce.entity.WishlistId;
import com.caltech.ecommerce.repository.WishlistRepository;
import com.caltech.ecommerce.repository.UserRepository;
import com.caltech.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Autowired
    public WishlistService(WishlistRepository wishlistRepository,
                           UserRepository userRepository,
                           ProductRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
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
        wishlist.setUser(userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found")));
        wishlist.setProduct(productRepository.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found")));
        return wishlistRepository.save(wishlist);
    }

    // Remove an item from the wishlist
    public void removeFromWishlist(Long userId, Long productId) {
        wishlistRepository.deleteByIdUserIdAndProductId(userId, productId);
    }

    // Check if an item is in the wishlist
    public boolean isItemInWishlist(Long userId, Long productId) {
        Optional<Wishlist> wishlistItem = wishlistRepository.findByIdUserIdAndProductId(userId, productId);
        return wishlistItem.isPresent();
    }
}
