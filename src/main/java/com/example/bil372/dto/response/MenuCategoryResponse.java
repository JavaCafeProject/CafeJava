package com.example.bil372.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class MenuCategoryResponse {
    private Long id;
    private String name;
    private int itemCount;
    private List<MenuItemResponse> items;
}
