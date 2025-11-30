package com.example.bil372.service.impl;

import com.example.bil372.dto.report.DailySalesReport;
import com.example.bil372.dto.report.EmployeePerformanceReport;
import com.example.bil372.dto.report.RevenueReport;
import com.example.bil372.dto.report.TopProductReport;
import com.example.bil372.model.Order;
import com.example.bil372.repository.EmployeeRepository;
import com.example.bil372.repository.OrderItemRepository;
import com.example.bil372.repository.OrderRepository;
import com.example.bil372.service.IReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReportService implements IReportService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;


    @Override
    public DailySalesReport getDailySalesReport() {
        DailySalesReport report = orderRepository.getDailySales();
        return report;
    }


    @Override
    public List<TopProductReport> getTopProducts() {
        List<Object[]> rows = orderItemRepository.getTopProducts();
        List<TopProductReport> topProductReports = new ArrayList<>();

        for(Object[] row : rows){
            TopProductReport topProductReport = new TopProductReport(
                    ((Number) row[0]).longValue(),
                    (String) row[1],
                    ((Number) row[2]).longValue()
            );
            topProductReports.add(topProductReport);
        }
        return topProductReports;
    }

    @Override
    public List<EmployeePerformanceReport> getEmployeePerformance() {
        List<Object[]> rows = orderRepository.getEmployeePerformance();
        List<EmployeePerformanceReport> employeePerformanceReports = new ArrayList<>();

        for(Object[] row : rows){
            EmployeePerformanceReport employeePerformanceReport = new EmployeePerformanceReport(
                    ((Number) row[0]).longValue(),
                    (String) row[1],
                    (String) row[2],
                    ((Number) row[3]).longValue(),
                    (BigDecimal) row[4]
            );
            employeePerformanceReports.add(employeePerformanceReport);
        }
        return employeePerformanceReports;
    }

    @Override
    public RevenueReport getRevenueReport() {
        RevenueReport row = orderRepository.getRevenue();
        return new RevenueReport(
                row.getTotalRevenueAllTime(),
                row.getTotalRevenueToday()
        );
    }


}
