package com.example.bil372.service.impl;

import com.example.bil372.dto.request.LoginRequest;
import com.example.bil372.dto.request.RegisterRequest;
import com.example.bil372.dto.response.AuthenticationResponse;
import com.example.bil372.model.Customer;
import com.example.bil372.model.ROLE;
import com.example.bil372.model.User;
import com.example.bil372.repository.CustomerRepository;
import com.example.bil372.repository.EmployeeRepository;
import com.example.bil372.repository.UserRepository;
import com.example.bil372.service.IAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse signIn(LoginRequest request) {

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));


        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Wrong email or password.");
        }

        // JWT token oluştur - User objesi ile (kullanıcı bilgileri otomatik eklenecek)
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(user.getId().longValue())
                .role(user.getRole())
                .build();
    }

    @Override
    public AuthenticationResponse signUp(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadCredentialsException("This email address is already in use.");
        }


        Customer customer = Customer.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(ROLE.CUSTOMER)
                .build();

        try {
            customerRepository.save(customer);
        } catch (DataIntegrityViolationException e) {
            throw new BadCredentialsException("This email address is already in use.");
        }

        var jwtToken = jwtService.generateToken(customer);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(customer.getId().longValue())
                .role(ROLE.CUSTOMER)
                .build();
    }

    @Override
    public User getProfile(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
