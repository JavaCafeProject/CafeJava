package com.example.bil372.dto.response;

import com.example.bil372.model.Item;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;

import java.util.List;

public class CategoryResponse {
    private String name;
    private List<ItemResponse> items;
}
