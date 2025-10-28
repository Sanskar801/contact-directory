package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Contact;

@Repository
public interface ContactRepo extends JpaRepository<Contact, Long> {
    Optional<Contact> findByEmail(String email);
    Optional<Contact> findByPhone(String phone);
    Page<Contact> findByNameContainingIgnoreCase(String name, Pageable pageable);
    boolean existByEmail(String email);
    boolean existByPhone(String phone);
}
