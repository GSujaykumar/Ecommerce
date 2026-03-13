package com.ecommerce.payment.service;

import com.ecommerce.payment.dto.PaymentIntentRequest;
import com.ecommerce.payment.dto.PaymentIntentResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class StripeService {

    @Value("${stripe.keys.secret}")
    private String secretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    public PaymentIntentResponse createPaymentIntent(PaymentIntentRequest request) throws StripeException {
        // Stripe expects amount in smallest currency unit (e.g., cents for USD, paise for INR)
        // We will assume the frontend sends the amount in Rupee/Dollars and convert to smallest unit (x100)
        long amountInSmallestUnit = request.amount() * 100;

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInSmallestUnit)
                .setCurrency(request.currency() != null ? request.currency() : "inr")
                .putMetadata("orderId", request.orderId())
                .putMetadata("userEmail", request.userEmail())
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                )
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);
        log.info("Created Stripe PaymentIntent for Order {}: {}", request.orderId(), paymentIntent.getId());

        return new PaymentIntentResponse(paymentIntent.getClientSecret(), paymentIntent.getId());
    }
}
