package com.ecommerce.user.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    private static String path(HttpServletRequest request) {
        return request != null ? request.getRequestURI() : "";
    }

    private static String correlationId(HttpServletRequest request) {
        if (request == null) return null;
        String id = request.getHeader("X-Correlation-ID");
        return id != null && !id.isBlank() ? id : null;
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleUserNotFound(UserNotFoundException ex, HttpServletRequest request) {
        log.warn("User not found: {}", ex.getMessage());
        ApiErrorResponse body = ApiErrorResponse.of(
                Instant.now(), path(request), HttpStatus.NOT_FOUND.value(),
                "Not Found", ex.getMessage(), correlationId(request), null);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<ApiErrorResponse.FieldErrorDetail> errors = ex.getBindingResult().getFieldErrors().stream()
                .map(fe -> new ApiErrorResponse.FieldErrorDetail(fe.getField(), fe.getDefaultMessage(), fe.getRejectedValue()))
                .collect(Collectors.toList());
        log.warn("Validation failed: {}", errors);
        ApiErrorResponse body = ApiErrorResponse.of(
                Instant.now(), path(request), HttpStatus.BAD_REQUEST.value(),
                "Validation Failed", "Invalid request payload", correlationId(request), errors);
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiErrorResponse> handleIllegalArgument(IllegalArgumentException ex, HttpServletRequest request) {
        log.warn("Invalid argument: {}", ex.getMessage());
        ApiErrorResponse body = ApiErrorResponse.of(
                Instant.now(), path(request), HttpStatus.BAD_REQUEST.value(),
                "Bad Request", ex.getMessage(), correlationId(request), null);
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGlobal(Exception ex, HttpServletRequest request) {
        log.error("Unhandled error at {}: {}", path(request), ex.getMessage(), ex);
        ApiErrorResponse body = ApiErrorResponse.of(
                Instant.now(), path(request), HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error", "An unexpected error occurred.", correlationId(request), null);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
