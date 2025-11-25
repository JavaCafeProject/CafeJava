package com.example.bil372.controller;

import com.example.bil372.dto.request.ReviewRequest;
import com.example.bil372.dto.response.ReviewResponse;
import com.example.bil372.model.Review;
import com.example.bil372.service.IReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/review")
public class ReviewController {

    private final IReviewService reviewService;

    @PostMapping
    public ReviewResponse createReview(@RequestBody ReviewRequest review){
        return reviewService.createReview(review);
    }

    @GetMapping("/item/{id}")
    public ReviewResponse getReviewById(@PathVariable Long id){
        return reviewService.getReviewById(id);
    }
}
