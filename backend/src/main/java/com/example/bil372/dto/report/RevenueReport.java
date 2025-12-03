package com.example.bil372.dto.report;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RevenueReport {
    private BigDecimal totalRevenueAllTime;
    private BigDecimal totalRevenueToday;
}
