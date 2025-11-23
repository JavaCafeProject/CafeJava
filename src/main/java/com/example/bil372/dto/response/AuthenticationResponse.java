package com.example.bil372.dto.response;

import com.example.bil372.model.ROLE;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {
    private String token;
    private ROLE role;
    private Long userId;
}
