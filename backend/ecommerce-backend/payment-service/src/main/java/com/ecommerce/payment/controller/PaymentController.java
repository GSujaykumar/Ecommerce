package com.ecommerce.payment.controller;

import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/payment")
@Slf4j
public class PaymentController {

    @PostMapping
    public String  makePayment(@RequestBody PaymentRequest paymentRequest) {
        log.info("Received payment request for amount: {}", paymentRequest.amount());
        return "Payment Successful";
    }
}

record PaymentRequest(java.math.BigDecimal amount, String orderId) {}
