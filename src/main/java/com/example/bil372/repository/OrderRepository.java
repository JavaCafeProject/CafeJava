package com.example.bil372.repository;

import com.example.bil372.dto.report.DailySalesReport;
import com.example.bil372.dto.report.EmployeePerformanceReport;
import com.example.bil372.dto.report.RevenueReport;
import com.example.bil372.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {


    @Query(value = """
    SELECT 
        CURDATE(),
        COUNT(*),
        COALESCE(SUM(o.total_price), 0)
    FROM orders o
    WHERE o.order_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 1 DAY)
    """, nativeQuery = true)
    Object[] getDailySales();




    @Query("""
        SELECT e.Id, e.firstName, e.lastName, COUNT(o.id), COALESCE(SUM(o.totalPrice), 0)
        FROM Order o
        JOIN o.employee e
        WHERE e IS NOT NULL
        GROUP BY e.Id, e.firstName, e.lastName
        ORDER BY COALESCE(SUM(o.totalPrice), 0) DESC
    """)
    List<Object[]> getEmployeePerformance();



    @Query("""
        SELECT 
            COALESCE(SUM(o.totalPrice), 0),
            COALESCE(SUM(CASE WHEN FUNCTION('DATE', o.orderDate) = CURRENT_DATE THEN o.totalPrice ELSE 0 END), 0)
        FROM Order o
    """)
    Object[] getRevenue();




}
