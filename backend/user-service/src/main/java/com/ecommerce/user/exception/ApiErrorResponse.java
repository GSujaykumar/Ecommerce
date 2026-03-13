package com.ecommerce.user.exception;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
public record ApiErrorResponse(
        Instant timestamp,
        String path,
        int status,
        String error,
        String message,
        String correlationId,
        List<FieldErrorDetail> fieldErrors
) {
    public record FieldErrorDetail(String field, String message, Object rejectedValue) {}

    public static ApiErrorResponse of(Instant timestamp, String path, int status, String error, String message, String correlationId, List<FieldErrorDetail> fieldErrors) {
        return new ApiErrorResponse(timestamp, path, status, error, message, correlationId, fieldErrors);
    }
}
