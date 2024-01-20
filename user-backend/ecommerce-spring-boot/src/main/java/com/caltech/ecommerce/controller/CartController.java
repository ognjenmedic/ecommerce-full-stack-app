package com.caltech.ecommerce.controller;

import com.caltech.ecommerce.entity.Cart;
import com.caltech.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public Cart addToCart(@RequestParam Long userId, @RequestParam Long productId, @RequestParam int quantity) {
        return cartService.addToCart(userId, productId, quantity);
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
