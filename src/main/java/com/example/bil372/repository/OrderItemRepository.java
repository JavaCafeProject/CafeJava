package com.example.bil372.repository;

import com.example.bil372.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {

    @Query("""
        SELECT 
            oi.item.Id,
            oi.item.name,
            SUM(oi.quantity)
        FROM OrderItem oi
        GROUP BY oi.item.Id, oi.item.name
        ORDER BY SUM(oi.quantity) DESC
        LIMIT 5
    """)
    List<Object[]> getTopProducts();

}
