package com.example.bil372.service;

import com.example.bil372.dto.report.DailySalesReport;
import com.example.bil372.dto.report.EmployeePerformanceReport;
import com.example.bil372.dto.report.RevenueReport;
import com.example.bil372.dto.report.TopProductReport;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public interface IReportService {

    public DailySalesReport getDailySalesReport();

    public List<TopProductReport> getTopProducts();

    public List<EmployeePerformanceReport> getEmployeePerformance();

    public RevenueReport getRevenueReport();
}
