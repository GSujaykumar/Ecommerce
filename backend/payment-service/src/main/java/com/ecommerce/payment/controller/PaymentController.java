package com.ecommerce.payment.controller;

import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/payment")
@Slf4j
@RequiredArgsConstructor
public class PaymentController {
    
    private final com.ecommerce.payment.service.PaymentService paymentService;

    @PostMapping
    public String makePayment(@RequestBody PaymentRequest paymentRequest) {
        log.info("Received payment request for Order: {}, Amount: {}, User: {}", 
                paymentRequest.orderId(), paymentRequest.amount(), paymentRequest.userId());
        
        boolean success = paymentService.processPayment(paymentRequest.orderId(), paymentRequest.amount(), paymentRequest.userId());
        
        if (success) {
            return "Payment Successful";
        } else {
            return "Payment Failed";
        }
    }
}

record PaymentRequest(java.math.BigDecimal amount, String orderId, String userId) {}
