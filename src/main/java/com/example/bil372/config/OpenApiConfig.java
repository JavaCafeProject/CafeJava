package com.example.bil372.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "JavaCafe",
                        email = "JavaCafe@gmail.com",
                        url = "http://localhost:8080"
                ),
                description = "OpenApi documentation",
                title = "OpenApi specification" ),
        servers = { @Server(
                description = "Local ENV",
                url = "http://localhost:8080"
        ) } )

public class OpenApiConfig { }