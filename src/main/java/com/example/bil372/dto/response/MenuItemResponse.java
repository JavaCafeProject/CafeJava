package com.example.bil372.dto.response;


import lombok.Builder;

import java.math.BigDecimal;
@Builder
public class MenuItemResponse {
    private Long id;
    private String name;
    private BigDecimal price;
    private String description;
    private String imageUrl;
    private Long categoryId;
    private String categoryName;

}
