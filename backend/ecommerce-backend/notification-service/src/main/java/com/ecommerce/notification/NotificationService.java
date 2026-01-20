package com.ecommerce.notification;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@lombok.RequiredArgsConstructor
public class NotificationService {

    private final org.springframework.mail.javamail.JavaMailSender javaMailSender;

    @KafkaListener(topics = "notificationTopic")
    public void handleNotification(String orderNumber) {
        log.info("Received Notification for Order - {}", orderNumber);
        
        // Send Email
        org.springframework.mail.SimpleMailMessage message = new org.springframework.mail.SimpleMailMessage();
        message.setFrom("orders@obitostore.com");
        message.setTo("customer@example.com"); // Static for demo
        message.setSubject("Order Confirmation: " + orderNumber);
        message.setText("Thank you for your order! Your order number is " + orderNumber);
        
        try {
            javaMailSender.send(message);
            log.info("Email sent to user for order success!");
        } catch (Exception e) {
            log.error("Failed to send email notifcation", e);
        }
    }
}
