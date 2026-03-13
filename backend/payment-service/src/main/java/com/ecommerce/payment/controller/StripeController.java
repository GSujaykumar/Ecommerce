package com.ecommerce.payment.controller;

import com.ecommerce.payment.dto.PaymentIntentRequest;
import com.ecommerce.payment.dto.PaymentIntentResponse;
import com.ecommerce.payment.service.StripeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment/stripe")
@RequiredArgsConstructor
@Slf4j
public class StripeController {

    private final StripeService stripeService;

    @PostMapping("/create-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody PaymentIntentRequest request) {
        try {
            PaymentIntentResponse response = stripeService.createPaymentIntent(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Failed to create Stripe PaymentIntent", e);
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
