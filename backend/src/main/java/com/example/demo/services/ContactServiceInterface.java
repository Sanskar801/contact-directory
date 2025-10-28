package com.example.demo.services;

import org.springframework.data.domain.Pageable;

import com.example.demo.dto.ContactDTO;
import com.example.demo.dto.PagedResponse;

public interface ContactServiceInterface {
    PagedResponse<ContactDTO> getAllContacts(Pageable pageable);
    ContactDTO getContactById(Long id);
    ContactDTO createContact(ContactDTO contactDTO);
    ContactDTO updateContact(Long id, ContactDTO contactDTO);
    void deleteContact(Long id);
    PagedResponse<ContactDTO> searchContactsByName(String name, Pageable pageable);
    ContactDTO getContactByEmail(String email);
}
