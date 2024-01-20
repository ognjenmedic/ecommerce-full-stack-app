package com.caltech.ecommerce.service;

import com.caltech.ecommerce.entity.Cart;
import com.caltech.ecommerce.entity.CartItem;
import com.caltech.ecommerce.entity.Product;
import com.caltech.ecommerce.entity.User;
import com.caltech.ecommerce.repository.CartRepository;
import com.caltech.ecommerce.repository.ProductRepository;
import com.caltech.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart addToCart(Long userId, Long productId, int quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = user.getCart();
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            user.setCart(cart);
        }

        Optional<CartItem> existingCartItem = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getProductId().equals(productId))
                .findFirst();

        if (existingCartItem.isPresent()) {
            CartItem cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            CartItem newCartItem = new CartItem();
            newCartItem.setCart(cart);
            newCartItem.setProduct(product);
            newCartItem.setQuantity(quantity);
            cart.getCartItems().add(newCartItem);
        }

        return cartRepository.save(cart);
    }


    public Cart removeFromCart(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = user.getCart();
        if (cart != null) {
            cart.getCartItems().removeIf(item -> item.getProduct().getProductId().equals(productId));
        }

        return cartRepository.save(cart);
    }

    public BigDecimal calculateCartTotal(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        return cart.getCartItems().stream()
                .map(item -> item.getProduct().getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }


}
