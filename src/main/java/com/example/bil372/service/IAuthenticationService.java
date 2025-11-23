package com.example.bil372.service;

import com.example.bil372.dto.request.LoginRequest;
import com.example.bil372.dto.request.RegisterRequest;
import com.example.bil372.dto.response.AuthenticationResponse;
import com.example.bil372.model.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface IAuthenticationService {


    public AuthenticationResponse signIn(LoginRequest request);

    public AuthenticationResponse signUp(RegisterRequest request);

    public User getProfile(UserDetails userDetails);

}
