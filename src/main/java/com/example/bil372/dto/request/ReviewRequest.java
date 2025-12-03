package com.example.bil372.dto.request;

import lombok.Data;

@Data
public class ReviewRequest {

    private Long customerId;
    private Long itemId;
    private String description;

}
