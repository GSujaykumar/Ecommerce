package com.ecommerce.cart.controller;

import com.ecommerce.cart.model.Cart;
import com.ecommerce.cart.model.CartItem;
import com.ecommerce.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public Cart getCart(@AuthenticationPrincipal Jwt jwt) {
        String userId = (jwt != null) ? jwt.getSubject() : "test-user";
        return cartService.getCart(userId);
    }

    @PostMapping
    public Cart addToCart(@AuthenticationPrincipal Jwt jwt, @RequestBody CartItem cartItem) {
        String userId = (jwt != null) ? jwt.getSubject() : "test-user";
        return cartService.addToCart(userId, cartItem);
    }
    
    @DeleteMapping
    public void clearCart(@AuthenticationPrincipal Jwt jwt) {
         String userId = (jwt != null) ? jwt.getSubject() : "test-user";
         cartService.clearCart(userId);
    }
}
