package com.example.bil372.dto.report;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeePerformanceReport {
    private Long employeeId;
    private String firstName;
    private String lastName;
    private Long totalOrders;
    private BigDecimal totalRevenue;
}
