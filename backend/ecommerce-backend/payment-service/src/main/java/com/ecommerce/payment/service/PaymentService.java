package com.ecommerce.payment.service;

import com.ecommerce.payment.model.Payment;
import com.ecommerce.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public boolean processPayment(String orderId, BigDecimal amount) {
        log.info("Processing payment for Order: {}", orderId);
        
        // Mock Payment Logic
        // Reject if amount > 10000
        if (amount.compareTo(new BigDecimal(10000)) > 0) {
            log.error("Payment FAILED for Order: {}", orderId);
            savePayment(orderId, amount, "FAILED");
            return false;
        }

        savePayment(orderId, amount, "SUCCESS");
        return true;
    }

    private void savePayment(String orderId, BigDecimal amount, String status) {
        Payment payment = Payment.builder()
                .orderId(orderId)
                .amount(amount)
                .status(status)
                .timestamp(LocalDateTime.now())
                .build();
        paymentRepository.save(payment);
    }
}
