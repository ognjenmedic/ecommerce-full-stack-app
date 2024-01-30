package com.caltech.ecommerce.service;

import com.caltech.ecommerce.dto.CartDTO;
import com.caltech.ecommerce.dto.CartItemDTO;
import com.caltech.ecommerce.dto.ProductDTO;
import com.caltech.ecommerce.entity.*;
import com.caltech.ecommerce.repository.CartRepository;
import com.caltech.ecommerce.repository.ProductRepository;
import com.caltech.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart getCartByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = user.getCart();
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
          }
        BigDecimal cartTotal = calculateCartTotal(cart.getCartId());
        cart.setTotalPrice(cartTotal);

        return cart;    }

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
                .filter(item -> item.getProduct() != null &&
                        item.getProduct().getProductId().equals(productId))
                .findFirst();

        if (existingCartItem.isPresent()) {
            CartItem cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            CartItemId cartItemId = new CartItemId(userId, productId);
            CartItem newCartItem = new CartItem(cartItemId, product, user, cart, quantity);

            cart.getCartItems().add(newCartItem);
        }

        Cart savedCart = cartRepository.save(cart);

        BigDecimal cartTotal = calculateCartTotal(savedCart.getCartId());
        savedCart.setTotalPrice(cartTotal);

        return cartRepository.save(savedCart);
    }

    public Cart removeFromCart(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = user.getCart();
        if (cart != null) {
            Optional<CartItem> cartItemOptional = cart.getCartItems().stream()
                    .filter(item -> item.getProduct().getProductId().equals(productId))
                    .findFirst();

            cartItemOptional.ifPresent(cartItem -> {
                if (cartItem.getQuantity() > 1) {
                    cartItem.setQuantity(cartItem.getQuantity() - 1);
                } else {
                    cart.getCartItems().remove(cartItem);
                }
            });
            BigDecimal newTotal = calculateCartTotal(cart.getCartId());
            cart.setTotalPrice(newTotal);
        }

        return cartRepository.save(cart);
    }

    public BigDecimal calculateCartTotal(Long cartId) {
        if (cartId == null) {
            return BigDecimal.ZERO;
        }
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        return cart.getCartItems().stream()
                .map(item -> item.getProduct().getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public CartDTO convertToDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setCartId(cart.getCartId());
        cartDTO.setTotalPrice(cart.getTotalPrice());
        List<CartItemDTO> cartItemDTOs = cart.getCartItems().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        cartDTO.setCartItems(cartItemDTOs);
        return cartDTO;
    }

    private CartItemDTO convertToDTO(CartItem cartItem) {
        CartItemDTO cartItemDTO = new CartItemDTO();
        cartItemDTO.setProductId(cartItem.getProduct().getProductId());
        cartItemDTO.setQuantity(cartItem.getQuantity());

        Product product = cartItem.getProduct();
        if (product != null) {
            cartItemDTO.setProductName(product.getProductName());
            cartItemDTO.setImageUrl(product.getImageUrl());
            cartItemDTO.setDescription(product.getDescription());
            cartItemDTO.setUnitPrice(product.getUnitPrice());
        }

        return cartItemDTO;
    }


    @Transactional
    public Cart getCartWithProducts(Long userId) {
        Cart cart = getCartByUserId(userId);
        cart.getCartItems().forEach(item -> {
            // Accessing product data to ensure it's loaded
            Product product = item.getProduct();
            System.out.println("Product: " + product);
            if (product != null) {
                product.getProductName(); // or any other product data
            }
        });
        return cart;
    }

}
