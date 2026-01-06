package com.ecommerce.notification.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NotificationService {

    @KafkaListener(topics = "notificationTopic")
    public void handleNotification(String orderNumber) {
        // Send email/SMS logic here
        log.info("Received Notification for Order - {}", orderNumber);
        log.info("Sending Email notification...");
    }
}
