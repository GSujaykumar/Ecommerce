package com.ecommerce.payment.controller;

import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payment")
@Slf4j
@RequiredArgsConstructor
public class PaymentController {

    private final com.ecommerce.payment.service.PaymentService paymentService;

    @PostMapping
    public PaymentResponse makePayment(@RequestBody PaymentRequest paymentRequest) {
        log.info("Received payment request for Order: {}, Amount: {}, User: {}",
                paymentRequest.orderId(), paymentRequest.amount(), paymentRequest.userId());

        com.ecommerce.payment.service.PaymentService.PaymentResult result =
                paymentService.processPayment(paymentRequest.orderId(), paymentRequest.amount(), paymentRequest.userId());

        return new PaymentResponse(
                result.success(),
                result.message(),
                result.transactionId() != null ? String.valueOf(result.transactionId()) : null,
                result.orderId()
        );
    }

    @GetMapping("/order/{orderId}")
    public PaymentResponse getByOrderId(@PathVariable("orderId") String orderId) {
        return paymentService.findByOrderId(orderId)
                .map(p -> new PaymentResponse(
                        "SUCCESS".equals(p.getPaymentStatus()),
                        "Transaction saved",
                        String.valueOf(p.getId()),
                        p.getOrderId()
                ))
                .orElse(new PaymentResponse(false, "No payment found", null, orderId));
    }
}

record PaymentRequest(java.math.BigDecimal amount, String orderId, String userId) {}

record PaymentResponse(boolean success, String message, String transactionId, String orderId) {}
