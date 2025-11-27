package com.example.bil372.dto.response;

import com.example.bil372.model.Customer;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Builder
public class ReviewResponse {
            Long id;
            Long customerId;
            Long itemId;
            String description;
            LocalDateTime reviewDate;

}
