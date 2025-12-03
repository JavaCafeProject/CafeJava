package com.example.bil372.service.impl;

import com.example.bil372.dto.request.ReviewRequest;
import com.example.bil372.dto.response.ItemResponse;
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
import java.util.ArrayList;
import java.util.List;

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
    public ItemResponse getReviewById(Long id) {

        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));


        List<ReviewResponse> reviewResponses = new ArrayList<>();

        for (Review review : item.getReviews()) {
            ReviewResponse response = ReviewResponse.builder()
                    .id(review.getId())
                    .customerId(review.getCustomer().getId())
                    .itemId(review.getItem().getId())
                    .description(review.getDescription())
                    .reviewDate(review.getReviewDate())
                    .build();

            reviewResponses.add(response);
        }


        return ItemResponse.builder()
                .name(item.getName())
                .description(item.getDescription())
                .price(item.getPrice())
                .imageUrl(item.getImageUrl())
                .reviews(reviewResponses)
                .build();

    }
}