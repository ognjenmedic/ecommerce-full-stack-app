package com.caltech.ecommerce.controller;

import com.caltech.ecommerce.dto.AddToCartRequest;
import com.caltech.ecommerce.dto.CartDTO;
import com.caltech.ecommerce.entity.Cart;
import com.caltech.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<CartDTO> getCartByUserId(@PathVariable Long userId) {
        Cart cart = cartService.getCartByUserId(userId);
        CartDTO cartDTO = cartService.convertToDTO(cart);
        return ResponseEntity.ok(cartDTO);    }

    @PostMapping("/add")
    public Cart addToCart(@RequestBody AddToCartRequest addToCartRequest) {
        return cartService.addToCart(addToCartRequest.getUserId(),
                addToCartRequest.getProductId(),
                addToCartRequest.getQuantity());
    }

    @PostMapping("/remove")
    public Cart removeFromCart(@RequestParam Long userId, @RequestParam Long productId) {
        return cartService.removeFromCart(userId, productId);
    }

    @GetMapping("/total")
    public BigDecimal getCartTotal(@RequestParam Long cartId) {
        return cartService.calculateCartTotal(cartId);
    }

}
