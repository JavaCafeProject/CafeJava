package com.example.bil372.dto.response;

import com.example.bil372.model.ROLE;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String token;
    private ROLE role;
    private Long userId;
}
