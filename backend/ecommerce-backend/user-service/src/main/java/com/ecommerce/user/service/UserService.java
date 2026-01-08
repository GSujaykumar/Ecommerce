package com.ecommerce.user.service;

import com.ecommerce.user.dto.UserRequest;
import com.ecommerce.user.dto.UserResponse;

public interface UserService {
    // When a user logs in for the first time, we sync them
    UserResponse syncUser(String keycloakId, UserRequest userRequest);
    UserResponse getUserByKeycloakId(String keycloakId);
    UserResponse getUserByEmail(String email);
}
