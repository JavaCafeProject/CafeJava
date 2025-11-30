package com.example.bil372.dto.response;

import com.example.bil372.model.Category;
import com.example.bil372.model.Review;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class ItemResponse {
    private String name;
    private BigDecimal price;
    private String description;
    private String imageUrl;
    private List<ReviewResponse> reviews;
}
