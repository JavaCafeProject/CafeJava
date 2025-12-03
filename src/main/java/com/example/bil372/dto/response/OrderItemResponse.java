package com.example.bil372.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class OrderItemResponse {
    Long itemId;
    String itemName;
    int quantity;
    BigDecimal price;
}
