package com.ecommerce.user.controller;

import com.ecommerce.user.dto.UserRequest;
import com.ecommerce.user.dto.UserResponse;
import com.ecommerce.user.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserResponse getMyProfile(@AuthenticationPrincipal Jwt jwt, @RequestHeader(value = "X-User-Id", required = false) String userId) {
        if (jwt != null) {
            return userService.getUserByKeycloakId(jwt.getSubject());
        } else if (userId != null) {
            // Assuming userId passed in header is the Keycloak ID or we have a method to find by ID
            // For now, let's treat it as keycloakId or implement findById
            return userService.getUserByKeycloakId(userId);
        }
        throw new RuntimeException("User not authenticated");
    }

    @PostMapping("/sync")
    public UserResponse syncUser(@AuthenticationPrincipal Jwt jwt, @RequestHeader(value = "X-User-Id", required = false) String userId, @RequestBody UserRequest userRequest) {
        String keycloakId = null;
        String email = null;

        if (jwt != null) {
            keycloakId = jwt.getSubject();
            email = userRequest.email() != null ? userRequest.email() : jwt.getClaimAsString("email");
        } else if (userId != null) {
            keycloakId = userId;
            email = userRequest.email();
        }

        if (keycloakId == null) {
             // Fallback for non-auth setup
             keycloakId = java.util.UUID.randomUUID().toString();
        }

        // Re-construct request with verified email
        UserRequest securedRequest = new UserRequest(email, userRequest.password(), userRequest.fullName(), userRequest.address());
        
        return userService.syncUser(keycloakId, securedRequest);
    }
    @PostMapping("/login")
    public UserResponse login(@RequestBody UserRequest userRequest) {
        try {
            return userService.login(userRequest);
        } catch (Exception e) {
            // Auto-register if not found (Simplified Flow)
            String fakeId = java.util.UUID.randomUUID().toString();
            
            // Ensure we don't save empty names if auto-registering via Login
            String name = (userRequest.fullName() == null || userRequest.fullName().trim().isEmpty()) 
                          ? "New User" 
                          : userRequest.fullName();
                          
            UserRequest registrationRequest = new UserRequest(userRequest.email(), userRequest.password(), name, userRequest.address());
            return userService.syncUser(fakeId, registrationRequest);
        }
    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody UserRequest userRequest) {
         // Generate a fake Keycloak ID for now since we are bypassing Auth Server
         String fakeId = java.util.UUID.randomUUID().toString();
         return userService.syncUser(fakeId, userRequest);
    }
}
