package com.example.bil372.controller;

import com.example.bil372.dto.request.OrderRequest;
import com.example.bil372.dto.response.OrderResponse;
import com.example.bil372.service.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {

    private final IOrderService orderService;

    @PostMapping
    public OrderResponse createOrder(@RequestBody OrderRequest orderRequest) {return orderService.createOrder(orderRequest);}

    @GetMapping("/list")
    public List<OrderResponse> listOrder(){return orderService.listOrder();}

    @GetMapping("/{id}")
    public OrderResponse getOrderById(@PathVariable Long id){return orderService.getOrderById(id);}

    @PutMapping("/{id}/status")
    public OrderResponse updateStatus(@PathVariable Long id){return orderService.updateStatus(id);}

    @PutMapping("/{id}")
    public OrderResponse cancelOrder(@PathVariable Long id){return orderService.cancelOrder(id);}

}
