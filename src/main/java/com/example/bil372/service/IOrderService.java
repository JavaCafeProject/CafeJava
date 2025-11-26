package com.example.bil372.service;

import com.example.bil372.dto.request.OrderRequest;
import com.example.bil372.dto.response.OrderResponse;

import java.util.List;

public interface IOrderService {
    public OrderResponse createOrder(OrderRequest orderRequest);

    public List<OrderResponse> listOrder();

    public OrderResponse getOrderById(Long id);

    public OrderResponse updateStatus(Long id);

    public OrderResponse cancelOrder(Long id);

}
