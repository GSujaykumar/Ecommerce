package com.ecommerce.user.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.ecommerce.user.dto.UserRequest;
import com.ecommerce.user.dto.UserResponse;
import com.ecommerce.user.model.User;
import com.ecommerce.user.repository.UserRepository;
import com.ecommerce.user.exception.UserNotFoundException;
import com.ecommerce.user.service.UserService;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponse syncUser(String keycloakId, UserRequest userRequest) {
        Optional<User> existingUser = userRepository.findByKeycloakId(keycloakId);
        
        User user;
        if (existingUser.isPresent()) {
            user = existingUser.get();
            user.setFullName(userRequest.fullName());
            user.setAddress(userRequest.address());
            // Only update password if provided and not empty
            if (userRequest.password() != null && !userRequest.password().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userRequest.password()));
            }
        } else {
            user = new User();
            user.setKeycloakId(keycloakId);
            user.setEmail(userRequest.email());
            user.setPassword(passwordEncoder.encode(userRequest.password()));
            user.setFullName(userRequest.fullName());
            user.setAddress(userRequest.address());
        }
        
        userRepository.save(user);
        return mapToResponse(user);
    }

    @Override
    public UserResponse getUserByKeycloakId(String keycloakId) {
        User user = userRepository.findByKeycloakId(keycloakId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + keycloakId));
        return mapToResponse(user);
    }

    @Override
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
        return mapToResponse(user);
    }

    @Override
    public UserResponse login(UserRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + request.email()));
        
        if (request.password() != null && !passwordEncoder.matches(request.password(), user.getPassword())) {
             throw new RuntimeException("Invalid credentials");
        }
        return mapToResponse(user);
    }

    private UserResponse mapToResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getKeycloakId(),
                user.getEmail(),
                user.getFullName(),
                user.getAddress()
        );
    }
}
