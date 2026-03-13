package com.ecommerce.product.exception;

/**
 * Thrown when the request is invalid (400).
 */
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }
}
