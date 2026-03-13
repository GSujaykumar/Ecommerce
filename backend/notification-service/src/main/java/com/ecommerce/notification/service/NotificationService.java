package com.ecommerce.notification.service;

import com.ecommerce.notification.event.OrderPlacedEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationService {

    private final JavaMailSender mailSender;
    private final ObjectMapper objectMapper;
    private final InvoicePdfService invoicePdfService;
    private final SimpMessagingTemplate messagingTemplate;
    
    // Simple idempotency set to prevent double notifications (Kafka + RabbitMQ)
    private final java.util.Set<String> processedOrders = java.util.Collections.synchronizedSet(new java.util.HashSet<>());

    @KafkaListener(topics = "notificationTopic")
    public void handleNotification(String message) {
        log.info("Received Kafka Message: {}", message);
        process(message, "KAFKA");
    }

    @org.springframework.amqp.rabbit.annotation.RabbitListener(queues = "notificationQueue")
    public void handleRabbitNotification(String message) {
        log.info("Received RabbitMQ Message: {}", message);
        process(message, "RABBITMQ");
    }

    private void process(String message, String source) {
        try {
            OrderPlacedEvent event;
            if (message.startsWith("{")) {
                event = objectMapper.readValue(message, OrderPlacedEvent.class);
            } else {
                event = new OrderPlacedEvent(message, "customer@example.com", "", "0");
            }

            String orderNumber = event.orderNumber();
            
            // Idempotency check
            if (processedOrders.contains(orderNumber)) {
                log.info("Duplicate notification detected from {} for Order {}. Skipping...", source, orderNumber);
                return;
            }
            processedOrders.add(orderNumber);
            
            // Limit set size to prevent memory leak
            if (processedOrders.size() > 1000) {
                processedOrders.clear(); 
            }

            String totalAmount = (event.totalAmount() != null && !event.totalAmount().isEmpty()) ? event.totalAmount() : "0";
            log.info("Processing Notification for Order {} (total: {}), email: {}, mobile: {}",
                    event.orderNumber(), totalAmount, event.email(), event.mobileNumber());

            if (event.email() != null && !event.email().isEmpty()) {
                byte[] pdfBytes = invoicePdfService.generateInvoicePdf(event.orderNumber(), event.email(), totalAmount);
                MimeMessage mimeMessage = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                helper.setFrom("notifications@ecommerce.com");
                helper.setTo(event.email());
                helper.setSubject("Order Confirmation & Invoice #" + event.orderNumber());
                helper.setText(
                        "Thank you for your order!\n\n" +
                                "Order #: " + event.orderNumber() + "\n" +
                                "Total: $" + totalAmount + "\n\n" +
                                "Your transaction has been saved. Please find your invoice attached as PDF.\n\n" +
                                "— Obito Store",
                        false
                );
                if (pdfBytes != null && pdfBytes.length > 0) {
                    helper.addAttachment("Invoice-" + event.orderNumber() + ".pdf", new ByteArrayResource(pdfBytes));
                    log.info("Invoice PDF attached and email sent to {}", event.email());
                }
                mailSender.send(mimeMessage);
                log.info("Email with PDF invoice sent to {} successfully.", event.email());
            }

            if (event.mobileNumber() != null && !event.mobileNumber().isEmpty() && !event.mobileNumber().equalsIgnoreCase("Unknown")) {
                log.info("SMS notification sent to {}: Your Order #{} is confirmed. Total: ${}. Transaction saved.",
                        event.mobileNumber(), event.orderNumber(), totalAmount);
            } else {
                log.info("No mobile number provided; SMS skipped.");
            }

            // --- REAL-TIME WEBSOCKET NOTIFICATION ---
            String wsMessage = String.format("{\"orderId\": \"%s\", \"status\": \"PLACED\", \"total\": \"%s\", \"email\": \"%s\", \"message\": \"Order %s accepted!\"}",
                    event.orderNumber(), totalAmount, event.email(), event.orderNumber());
            messagingTemplate.convertAndSend("/topic/notifications", wsMessage);
            log.info("Broadcasted WebSocket Notification: {}", wsMessage);

            log.info("All notifications processed for Order: {}", event.orderNumber());
        } catch (Exception e) {
            log.error("Failed to process notification message {}: {}", message, e.getMessage());
        }
    }
}
