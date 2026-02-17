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

    public boolean processPayment(String orderId, BigDecimal amount, String userId) {
        log.info("Processing payment for Order: {} by User: {}", orderId, userId);
        
        // Mock Payment Logic
        // Reject if amount > 10000
        if (amount.compareTo(new BigDecimal(10000)) > 0) {
            log.error("Payment FAILED for Order: {}", orderId);
            savePayment(orderId, amount, "FAILED", userId);
            return false;
        }

        savePayment(orderId, amount, "SUCCESS", userId);
        return true;
    }

    private void savePayment(String orderId, BigDecimal amount, String status, String userId) {
        Payment payment = Payment.builder()
                .userId(userId)
                .orderId(orderId)
                .amount(amount)
                .paymentStatus(status)
                .timestamp(LocalDateTime.now())
                .build();
        paymentRepository.save(payment);
    }
}
