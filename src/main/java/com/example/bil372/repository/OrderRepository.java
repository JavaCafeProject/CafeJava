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
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = """
            SELECT o FROM Order o
            JOIN FETCH o.customer c
            JOIN FETCH o.employee e
            JOIN FETCH o.orderItems oi
            JOIN FETCH oi.item i
            WHERE o.id = :id
    """)
    Optional<Order> findByIdWithDetails(@Param("id") Long id);

    @Query(value = """
            SELECT o 
            FROM Order o 
            JOIN FETCH o.customer c 
            JOIN FETCH o.employee e 
            JOIN FETCH o.orderItems oi 
            JOIN FETCH oi.item i
    """)
    List<Order> findAllWithDetails();


    @Query(value = """
    SELECT 
        CURDATE() AS date,
        COUNT(*) AS totalOrders,
        COALESCE(SUM(o.total_price), 0) AS revenue
    FROM orders o
    WHERE o.order_date >= CURDATE() AND o.order_date < DATE_ADD(CURDATE(), INTERVAL 1 DAY)
""", nativeQuery = true)
    DailySalesReport getDailySales();





    @Query("""
        SELECT e.Id, e.firstName, e.lastName, COUNT(o.id), COALESCE(SUM(o.totalPrice), 0)
        FROM Order o
        JOIN o.employee e
        WHERE e IS NOT NULL
        GROUP BY e.Id, e.firstName, e.lastName
        ORDER BY COALESCE(SUM(o.totalPrice), 0) DESC
    """)
    List<Object[]> getEmployeePerformance();



    @Query(value = """
    SELECT 
        COALESCE(SUM(o.total_price), 0) AS totalRevenueAllTime,
        COALESCE(SUM(CASE WHEN DATE(o.order_date) = CURDATE() THEN o.total_price ELSE 0 END), 0) AS totalRevenueToday
    FROM orders o
""", nativeQuery = true)
    RevenueReport getRevenue();





}