package com.example.bil372.dto.response;

import com.example.bil372.model.Customer;

import java.time.LocalDateTime;

public class ReviewResponse {
    private Customer customer;
    private ItemResponse item;
    private String description;
    private LocalDateTime reviewDate;
}
