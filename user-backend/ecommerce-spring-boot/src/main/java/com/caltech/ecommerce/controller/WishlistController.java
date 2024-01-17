package com.caltech.ecommerce.controller;

import com.caltech.ecommerce.entity.Wishlist;
import com.caltech.ecommerce.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    @Autowired
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Wishlist>> getWishlistByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(wishlistService.getWishlistByUserId(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<Wishlist> addToWishlist(@RequestParam Long userId, @RequestParam Long productId) {
        return ResponseEntity.ok(wishlistService.addToWishlist(userId, productId));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeFromWishlist(@RequestParam Long userId, @RequestParam Long productId) {
        wishlistService.removeFromWishlist(userId, productId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> isItemInWishlist(@RequestParam Long userId, @RequestParam Long productId) {
        boolean isInWishlist = wishlistService.isItemInWishlist(userId, productId);
        return ResponseEntity.ok(isInWishlist);
    }
}
