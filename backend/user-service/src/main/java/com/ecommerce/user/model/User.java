package com.ecommerce.user.model;

import jakarta.persistence.*;

@Entity
@Table(name = "t_users")
public class User {

    public User() {}

    public User(Long id, String keycloakId, String email, String password, String fullName, String address) {
        this.id = id;
        this.keycloakId = keycloakId;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.address = address;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String keycloakId;
    private String email;
    private String password;
    private String fullName;
    private String address;

    public void setKeycloakId(String keycloakId) { this.keycloakId = keycloakId; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setAddress(String address) { this.address = address; }
    public void setId(Long id) { this.id = id; }

    public String getKeycloakId() { return keycloakId; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getFullName() { return fullName; }
    public String getAddress() { return address; }
    public Long getId() { return id; }
}