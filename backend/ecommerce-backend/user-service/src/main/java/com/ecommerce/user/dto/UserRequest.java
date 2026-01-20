package com.ecommerce.user.dto;

public record UserRequest(String email, String password, String fullName, String address) {}
