package com.ecommerce.payment.service;

import com.ecommerce.payment.model.Payment;
import com.ecommerce.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public record PaymentResult(boolean success, String message, Long transactionId, String orderId) {}

    public PaymentResult processPayment(String orderId, BigDecimal amount, String userId) {
        log.info("Processing payment for Order: {} by User: {}", orderId, userId);

        if (amount.compareTo(new BigDecimal(100000)) > 0) {
            log.error("Payment FAILED for Order: {}", orderId);
            Payment p = savePayment(orderId, amount, "FAILED", userId);
            return new PaymentResult(false, "Payment Failed", p.getId(), orderId);
        }

        Payment p = savePayment(orderId, amount, "SUCCESS", userId);
        log.info("Transaction saved: id={}, orderId={}, amount={}", p.getId(), orderId, amount);
        return new PaymentResult(true, "Payment Successful", p.getId(), orderId);
    }

    private Payment savePayment(String orderId, BigDecimal amount, String status, String userId) {
        Payment payment = Payment.builder()
                .userId(userId)
                .orderId(orderId)
                .amount(amount)
                .paymentStatus(status)
                .timestamp(LocalDateTime.now())
                .build();
        return paymentRepository.save(payment);
    }

    public Optional<Payment> findByOrderId(String orderId) {
        return paymentRepository.findFirstByOrderIdOrderByTimestampDesc(orderId);
    }
}
