package com.example.bil372.dto.report;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailySalesReport {
    private Date date;
    private Long totalOrders;
    private BigDecimal revenue;
}
