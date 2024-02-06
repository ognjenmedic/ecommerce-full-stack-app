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
@RequestMapping("api/cart")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<CartDTO> getCartByUserId(@PathVariable Long userId) {
        Cart cart = cartService.getCartWithProducts(userId);
        CartDTO cartDTO = cartService.convertToDTO(cart);
        return ResponseEntity.ok(cartDTO);    }

    @PostMapping("/add")
    public ResponseEntity<CartDTO> addToCart(@RequestBody AddToCartRequest addToCartRequest) {
        Cart cart = cartService.addToCart(addToCartRequest.getUserId(),
                addToCartRequest.getProductId(),
                addToCartRequest.getQuantity());
        CartDTO cartDTO = cartService.convertToDTO(cart);
        return ResponseEntity.ok(cartDTO);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<CartDTO> removeFromCart(@RequestParam Long userId, @RequestParam Long productId) {
        System.out.println("removeFromCart called with userId = " + userId + " and productId = " + productId);
        Cart cart = cartService.removeFromCart(userId, productId);
        CartDTO cartDTO = cartService.convertToDTO(cart);
        return ResponseEntity.ok(cartDTO);
    }

    @GetMapping("/total")
    public BigDecimal getCartTotal(@RequestParam Long cartId) {
        return cartService.calculateCartTotal(cartId);
    }

}
