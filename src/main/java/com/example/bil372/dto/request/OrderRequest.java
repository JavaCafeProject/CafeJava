package com.example.bil372.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderRequest {
    private Long customerId;
    private Long employeeId;
    private List<OrderItemRequest> orderItems;
}
