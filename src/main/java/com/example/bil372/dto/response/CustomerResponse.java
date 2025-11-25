package com.example.bil372.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerResponse {
    Long id;
    String firstName;
    String lastName;
    String email;
}
