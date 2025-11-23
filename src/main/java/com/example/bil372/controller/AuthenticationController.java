package com.example.bil372.controller;

import com.example.bil372.dto.request.LoginRequest;
import com.example.bil372.dto.request.RegisterRequest;
import com.example.bil372.dto.response.AuthenticationResponse;
import com.example.bil372.model.User;
import com.example.bil372.service.IAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Controller
@RequestMapping("/auth")
public class AuthenticationController {

    private final IAuthenticationService authenticationService;

    @PostMapping("/sign_in")
    public ResponseEntity<AuthenticationResponse> signIn(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authenticationService.signIn(request));
    }

    @PostMapping("/sign_up")
    public ResponseEntity<AuthenticationResponse> signUp(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.signUp(request));
    }

    @GetMapping("/profile")
    public User getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return authenticationService.getProfile(userDetails);
    }

}
