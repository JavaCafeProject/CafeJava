package com.example.bil372.service.impl;

import com.example.bil372.dto.request.ReviewRequest;
import com.example.bil372.dto.response.ReviewResponse;
import com.example.bil372.model.Customer;
import com.example.bil372.model.Item;
import com.example.bil372.model.Review;
import com.example.bil372.repository.CustomerRepository;
import com.example.bil372.repository.ItemRepository;
import com.example.bil372.repository.ReviewRepository;
import com.example.bil372.service.IReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReviewService implements IReviewService {

    @Autowired
    private final ReviewRepository reviewRepository;
    private final CustomerRepository customerRepository;
    private final ItemRepository itemRepository;

    @Override
    public ReviewResponse createReview(ReviewRequest request) {

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));


        Item item = itemRepository.findById(request.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found"));



        Review review = Review.builder()
                .customer(customer)
                .item(item)
                .description(request.getDescription())
                .reviewDate(LocalDateTime.now())
                .build();


        reviewRepository.save(review);

        return ReviewResponse.builder()
                .id(review.getId())
                .description(review.getDescription())
                .customerId(review.getCustomer().getId())
                .itemId(review.getItem().getId())
                .reviewDate(review.getReviewDate())
                .build();

    }


    @Override
    public ReviewResponse getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        return ReviewResponse.builder()
                .id(review.getId())
                .description(review.getDescription())
                .itemId(review.getItem().getId())
                .customerId(review.getCustomer().getId())
                .reviewDate(review.getReviewDate())
                .build();

    }
}
