package com.caltech.ecommerce.controller;

import com.caltech.ecommerce.dto.WishlistDTO;
import com.caltech.ecommerce.entity.Wishlist;
import com.caltech.ecommerce.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    @Autowired
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<WishlistDTO>> getWishlistByUser(@PathVariable Long userId) {
        List<WishlistDTO> wishlist = wishlistService.getWishlistByUserId(userId);
        return ResponseEntity.ok(wishlist);
    }

    @PostMapping("/add")
    public ResponseEntity<WishlistDTO> addToWishlist(@RequestBody WishlistDTO wishlistDTO) {
        WishlistDTO newWishlist = wishlistService.addToWishlist(wishlistDTO);
        return ResponseEntity.ok(newWishlist);
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
