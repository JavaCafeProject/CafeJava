package com.example.bil372.dto.request;


import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Builder
@Data
public class MenuItemRequest {
    private String name;
    private BigDecimal price;
    private String description;
    private String imageUrl;
    private Long categoryId;
}
