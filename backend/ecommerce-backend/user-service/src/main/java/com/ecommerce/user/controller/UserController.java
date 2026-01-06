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
    public UserResponse getMyProfile(@AuthenticationPrincipal Jwt jwt) {
        String keycloakId = jwt.getSubject();
        return userService.getUserByKeycloakId(keycloakId);
    }

    @PostMapping("/sync")
    public UserResponse syncUser(@AuthenticationPrincipal Jwt jwt, @RequestBody UserRequest userRequest) {
        String keycloakId = jwt.getSubject();
        // Fallback: If email is missing in request, try to get from token
        String email = userRequest.email() != null ? userRequest.email() : jwt.getClaimAsString("email");
        
        // Re-construct request with verified email
        UserRequest securedRequest = new UserRequest(email, userRequest.fullName(), userRequest.address());
        
        return userService.syncUser(keycloakId, securedRequest);
    }
}
