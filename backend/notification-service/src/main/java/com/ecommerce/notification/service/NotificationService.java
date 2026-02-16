package com.ecommerce.notification.service;

import com.ecommerce.notification.event.OrderPlacedEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationService {

    private final JavaMailSender mailSender;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "notificationTopic")
    public void handleNotification(String message) {
        log.info("Received Kafka Message: {}", message);
        
        try {
            // Check if message is JSON (OrderPlacedEvent) or just a plain order number
            OrderPlacedEvent event;
            if (message.startsWith("{")) {
                event = objectMapper.readValue(message, OrderPlacedEvent.class);
            } else {
                // Fallback for simple order number
                event = new OrderPlacedEvent(message, "customer@example.com", "Unknown");
            }

            log.info("Processing Notification for Order - {}", event.orderNumber());
            
            // 1. Send Email
            if (event.email() != null && !event.email().isEmpty()) {
                SimpleMailMessage email = new SimpleMailMessage();
                email.setFrom("notifications@ecommerce.com");
                email.setTo(event.email());
                email.setSubject("Order Confirmation - " + event.orderNumber());
                email.setText("Thank you for your order! Your order #" + event.orderNumber() + " has been placed successfully.");
                
                mailSender.send(email);
                log.info("Email notification sent to {} successfully via MailDev.", event.email());
            }

            // 2. Send SMS if mobile number is provided
            if (event.mobileNumber() != null && !event.mobileNumber().isEmpty() && !event.mobileNumber().equalsIgnoreCase("Unknown")) {
                log.info("Sending SMS notification to {}: Your Order #{} is confirmed.", event.mobileNumber(), event.orderNumber());
            } else {
                log.info("No mobile number provided, skipping SMS notification.");
            }
            
            log.info("All notifications processed for Order: {}", event.orderNumber());
        } catch (Exception e) {
            log.error("Failed to process notification message {}: {}", message, e.getMessage());
        }
    }
}
