package com.example.bil372.dto.response;

import lombok.Builder;

@Builder
public class MenuCategoryResponse {
    private Long id;
    private String name;
    private int itemCount;
}
