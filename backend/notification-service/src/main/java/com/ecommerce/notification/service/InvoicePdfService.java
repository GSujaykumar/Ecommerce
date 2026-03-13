package com.ecommerce.notification.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@Slf4j
public class InvoicePdfService {

    private static final Font TITLE_FONT = new Font(Font.HELVETICA, 18, Font.BOLD);
    private static final Font NORMAL_FONT = new Font(Font.HELVETICA, 10);

    public byte[] generateInvoicePdf(String orderNumber, String customerEmail, String totalAmount) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, baos);
            document.open();

            document.add(new Paragraph("OBITO STORE", TITLE_FONT));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("INVOICE / ORDER CONFIRMATION", new Font(Font.HELVETICA, 14, Font.BOLD)));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Order Number: " + orderNumber, NORMAL_FONT));
            document.add(new Paragraph("Date: " + LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE), NORMAL_FONT));
            document.add(new Paragraph("Customer Email: " + (customerEmail != null ? customerEmail : "N/A"), NORMAL_FONT));
            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100f);
            table.addCell(createCell("Total Amount", true));
            table.addCell(createCell("$" + (totalAmount != null && !totalAmount.isEmpty() ? totalAmount : "0.00"), false));
            document.add(table);

            document.add(new Paragraph(" "));
            document.add(new Paragraph("Thank you for your order. Your transaction has been saved.", NORMAL_FONT));
            document.add(new Paragraph("View your order details in your account.", NORMAL_FONT));
            document.add(new Paragraph(" "));
            document.add(new Paragraph("— Obito Store", NORMAL_FONT));

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            log.error("Failed to generate invoice PDF: {}", e.getMessage());
            return new byte[0];
        }
    }

    private static PdfPCell createCell(String text, boolean header) {
        PdfPCell cell = new PdfPCell(new Phrase(text, NORMAL_FONT));
        if (header) cell.setBackgroundColor(new java.awt.Color(0.95f, 0.95f, 0.95f));
        return cell;
    }
}
