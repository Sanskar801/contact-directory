package com.example.demo.config;

import java.util.Random;
import java.util.stream.IntStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.demo.model.Contact;
import com.example.demo.repository.ContactRepo;

@Configuration
public class DataSeeder {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataSeeder.class);

    @Bean
    CommandLineRunner seedContacts(ContactRepo contactRepo) {
        return args -> {
            long existing = contactRepo.count();
            if (existing >= 25) {
                LOGGER.info("Skipping seeding. Existing contacts: {}", existing);
                return;
            }

            int toCreate = (int) (25 - existing);
            LOGGER.info("Seeding {} demo contacts...", toCreate);

            String[] firstNames = {
                "Alice","Bob","Charlie","Diana","Ethan","Fiona","George","Hannah","Ian","Jasmine",
                "Kevin","Lily","Mason","Nora","Owen","Paula","Quentin","Rita","Sam","Tina",
                "Uma","Victor","Wendy","Xavier","Yara","Zack"
            };
            String[] lastNames = {
                "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez",
                "Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin"
            };

            Random random = new Random(42);

            IntStream.range(0, toCreate).forEach(i -> {
                String fn = firstNames[random.nextInt(firstNames.length)];
                String ln = lastNames[random.nextInt(lastNames.length)];
                String name = fn + " " + ln;
                String base = (fn + "." + ln).toLowerCase();
                String email = base + i + "@example.com";
                String phone = String.format("+1-555-%04d", 1000 + random.nextInt(9000));

                // Ensure unique constraints by retrying suffix if necessary
                int attempt = 0;
                while (contactRepo.existsByEmail(email) || contactRepo.existsByPhone(phone)) {
                    attempt++;
                    email = base + i + "-" + attempt + "@example.com";
                    phone = String.format("+1-555-%04d", 1000 + random.nextInt(9000));
                }

                Contact contact = new Contact(name, phone, email);
                contactRepo.save(contact);
            });

            LOGGER.info("Seeding complete. Total contacts: {}", contactRepo.count());
        };
    }
}


