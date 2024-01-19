package com.caltech.ecommerce.service;

import com.caltech.ecommerce.dto.WishlistDTO;
import com.caltech.ecommerce.entity.Product;
import com.caltech.ecommerce.entity.Wishlist;
import com.caltech.ecommerce.entity.WishlistId;
import com.caltech.ecommerce.repository.WishlistRepository;
import com.caltech.ecommerce.repository.UserRepository;
import com.caltech.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public List<WishlistDTO> getWishlistByUserId(Long userId) {
        return wishlistRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public Wishlist addToWishlist(Long userId, Long productId) {
        WishlistId wishlistId = new WishlistId(userId, productId);
        Wishlist wishlist = new Wishlist();
        wishlist.setId(wishlistId);
        wishlist.setUser(userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found")));
        wishlist.setProduct(productRepository.findById(productId).orElseThrow(() -> new EntityNotFoundException("Product not found")));
        return wishlistRepository.save(wishlist);
    }

    @Transactional
    public WishlistDTO addToWishlist(WishlistDTO wishlistDTO) {
        Wishlist wishlist = convertToEntity(wishlistDTO);
        Wishlist savedWishlist = wishlistRepository.save(wishlist);
        return convertToDTO(savedWishlist);
    }

    // Remove an item from the wishlist
    @Transactional
    public void removeFromWishlist(Long userId, Long productId) {
        wishlistRepository.deleteWishlistEntry(userId, productId);
    }


    // Check if an item is in the wishlist
    @Transactional
    public boolean isItemInWishlist(Long userId, Long productId) {
        WishlistId id = new WishlistId(userId, productId);
        return wishlistRepository.findById(id).isPresent();
    }

    public WishlistDTO convertToDTO(Wishlist wishlist) {
        Product product = wishlist.getProduct();
        return new WishlistDTO(
                wishlist.getUser().getUserId(),
                wishlist.getProduct().getProductId(),
                product.getProductName(),
                product.getImageUrl(),
                product.getDescription(),
                product.getUnitPrice());
    }

    public Wishlist convertToEntity(WishlistDTO wishlistDTO) {
        Wishlist wishlist = new Wishlist();
        wishlist.setUser(userRepository.findById(wishlistDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found")));
        wishlist.setProduct(productRepository.findById(wishlistDTO.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found")));
        wishlist.setId(new WishlistId(wishlistDTO.getUserId(), wishlistDTO.getProductId()));
        return wishlist;
    }

}
