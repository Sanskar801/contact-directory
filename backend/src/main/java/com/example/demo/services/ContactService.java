package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.ResourceAccessException;

import com.example.demo.dto.ContactDTO;
import com.example.demo.dto.PagedResponse;
import com.example.demo.model.Contact;
import com.example.demo.repository.ContactRepo;

@Service
@Transactional
public class ContactService implements ContactServiceInterface {

    private final ContactRepo contactRepo;

    public ContactService(ContactRepo contactRepo) {
        this.contactRepo = contactRepo;
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<ContactDTO> getAllContacts(Pageable pageable) {
        Page<Contact> contactPage = contactRepo.findAll(pageable);
        return mapToPagedResponse(contactPage);
    }

    @Override
    @Transactional(readOnly = true)
    public ContactDTO getContactById(Long id) {
        Contact contact = contactRepo.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Contact not found with id: " + id));
        return convertToDTO(contact);
    }

    @Override
    public ContactDTO createContact(ContactDTO contactDTO) {
        if (contactRepo.existByEmail(contactDTO.email())) {
            throw new Error("Contact with Email" + contactDTO.email());
        }

        if (contactRepo.existByPhone(contactDTO.phone())) {
            throw new Error("Contact with Phone" + contactDTO.phone());
        }

        Contact contact = convertToEntity(contactDTO);
        Contact savedContact = contactRepo.save(contact);
        return convertToDTO(savedContact);
    }

    @Override
    public ContactDTO updateContact(Long id, ContactDTO contactDTO) {
        Contact existingContact = contactRepo.findById(id)
                .orElseThrow(() -> new Error("Contact not found with id:" + id));

        existingContact.setName(contactDTO.name());
        existingContact.setPhone(contactDTO.phone());
        existingContact.setEmail(contactDTO.email());

        Contact updatedContact = contactRepo.save(existingContact);
        return convertToDTO(updatedContact);
    }

    @Override
    public void deleteContact(Long id) {
        if (!contactRepo.existsById(id)) {
            throw new Error("Contact not found with id: " + id);
        }
        contactRepo.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<ContactDTO> searchContactsByName(String name, Pageable pageable) {
        Page<Contact> contactPage = contactRepo.findByNameContainingIgnoreCase(name, pageable);
        return mapToPagedResponse(contactPage);
    }

    @Override
    @Transactional(readOnly = true)
    public ContactDTO getContactByEmail(String email) {
        Contact contact = contactRepo.findByEmail(email)
                .orElseThrow(() -> new Error("Contact not found with email: " + email));
        return convertToDTO(contact);
    }

    // Helper Method
    private PagedResponse<ContactDTO> mapToPagedResponse(Page<Contact> contactPage) {
        List<ContactDTO> dtos = contactPage.getContent()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return new PagedResponse<>(
                dtos,
                contactPage.getNumber(),
                contactPage.getSize(),
                contactPage.getTotalElements(),
                contactPage.getTotalPages(),
                contactPage.isFirst(),
                contactPage.isLast(),
                contactPage.isEmpty());
    }

    private ContactDTO convertToDTO(Contact contact) {
        return new ContactDTO(
                contact.getId(),
                contact.getName(),
                contact.getPhone(),
                contact.getEmail(),
                contact.getCreatedAt(),
                contact.getUpdatedAt());
    }

    private Contact convertToEntity(ContactDTO dto) {
        Contact contact = new Contact();
        contact.setName(dto.name());
        contact.setPhone(dto.phone());
        contact.setEmail(dto.email());

        return contact;
    }

}
