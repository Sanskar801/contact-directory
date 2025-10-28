package com.example.demo.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ContactDTO(
    Long id,
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100)
    String name,
    
    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[0-9+\\-\\s()]+$", message = "Invalid phone number format")
    String phone,
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    String email,
    
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}