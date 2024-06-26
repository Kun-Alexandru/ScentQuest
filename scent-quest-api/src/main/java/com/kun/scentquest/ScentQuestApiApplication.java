package com.kun.scentquest;

import com.kun.scentquest.users.role.Role;
import com.kun.scentquest.users.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
public class ScentQuestApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ScentQuestApiApplication.class, args);
    }

    @Bean
    public CommandLineRunner runner(RoleRepository roleRepository) {
        return args -> {
            if(roleRepository.findByName("ROLE_USER").isEmpty()) {
                roleRepository.save(Role.builder().name("ROLE_USER").build());
                roleRepository.save(Role.builder().name("ROLE_ADMIN").build());
            }
        };
    }

}
