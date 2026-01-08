package com.ecommerce.payment.controller;

import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/payment")
@Slf4j
@lombok.RequiredArgsConstructor
public class PaymentController {
    
    private final com.ecommerce.payment.repository.PaymentRepository paymentRepository;

    @PostMapping
    public String makePayment(@RequestBody PaymentRequest paymentRequest) {
        log.info("Received payment request for amount: {}", paymentRequest.amount());
        
        com.ecommerce.payment.model.Payment payment = com.ecommerce.payment.model.Payment.builder()
            .orderId(paymentRequest.orderId())
            .amount(paymentRequest.amount())
            .paymentStatus("SUCCESS")
            .build();
            
        paymentRepository.save(payment);
        log.info("Payment saved: {}", payment);
        
        return "Payment Successful";
    }
}

record PaymentRequest(java.math.BigDecimal amount, String orderId) {}
