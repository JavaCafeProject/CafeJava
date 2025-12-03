package com.example.bil372.controller;

import com.example.bil372.dto.report.DailySalesReport;
import com.example.bil372.dto.report.EmployeePerformanceReport;
import com.example.bil372.dto.report.RevenueReport;
import com.example.bil372.dto.report.TopProductReport;
import com.example.bil372.dto.response.ReviewResponse;
import com.example.bil372.service.IReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/report")
public class ReportController {

    private final IReportService reportService;

    @GetMapping("/daily-sales")
    public DailySalesReport getDailySalesReport() {
        return reportService.getDailySalesReport();
    }

    @GetMapping("/top-products")
    public List<TopProductReport> getTopProducts() {
        return reportService.getTopProducts();
    }

    @GetMapping("/employee-performance")
    public List<EmployeePerformanceReport> getEmployeePerformance() {
        return reportService.getEmployeePerformance();
    }

    @GetMapping("/revenue")
    public RevenueReport getRevenueReport() {
        return reportService.getRevenueReport();
    }
}
