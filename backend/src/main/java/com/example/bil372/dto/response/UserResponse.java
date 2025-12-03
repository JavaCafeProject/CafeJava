package com.example.bil372.dto.response;

import com.example.bil372.model.ROLE;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private ROLE role;
}
