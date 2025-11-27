package com.example.bil372.dto.report;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopProductReport {
    private Long itemId;
    private String itemName;
    private int totalQuantitySold;
}
