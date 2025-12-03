package com.example.bil372.service;

import com.example.bil372.dto.request.ReviewRequest;
import com.example.bil372.dto.response.ItemResponse;
import com.example.bil372.dto.response.ReviewResponse;

public interface IReviewService {

    public ReviewResponse createReview(ReviewRequest review);

    public ItemResponse getReviewById(Long id);

}
