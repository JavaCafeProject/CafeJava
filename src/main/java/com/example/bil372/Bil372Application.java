package com.example.bil372;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.example.bil372")
@EnableJpaRepositories(basePackages = "com.example.bil372.repository")
@EntityScan(basePackages = "com.example.bil372.model")
public class Bil372Application {

    public static void main(String[] args) {
        SpringApplication.run(Bil372Application.class, args);
    }

}
