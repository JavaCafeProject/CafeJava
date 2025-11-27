package com.example.bil372.dto.request;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class OrderItemRequest {
    private Long itemID;
    private int quantity;
    private BigDecimal price;
}
