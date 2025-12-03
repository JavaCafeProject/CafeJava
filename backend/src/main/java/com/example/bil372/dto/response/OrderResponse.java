package com.example.bil372.dto.response;

import com.example.bil372.model.*;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderResponse {
    private Long id;
    private LocalDateTime orderDate;
    private Long customerId;
    private String customerName;
    private Long employeeId;
    private String employeeName;
    private List<OrderItemResponse> orderItems;
    private BigDecimal totalPrice;
    private STATUS status;
}
