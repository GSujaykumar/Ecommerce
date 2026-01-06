package com.ecommerce.user.service.impl;

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

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponse syncUser(String keycloakId, UserRequest userRequest) {
        Optional<User> existingUser = userRepository.findByKeycloakId(keycloakId);
        
        User user;
        if (existingUser.isPresent()) {
            user = existingUser.get();
            user.setFullName(userRequest.fullName());
            user.setAddress(userRequest.address());
        } else {
            user = new User(keycloakId, userRequest.email(), userRequest.fullName(), userRequest.address());
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
