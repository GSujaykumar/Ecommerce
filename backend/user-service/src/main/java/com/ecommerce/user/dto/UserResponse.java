package com.ecommerce.user.dto;

public record UserResponse(Long id, String keycloakId, String email, String fullName, String address) {}
