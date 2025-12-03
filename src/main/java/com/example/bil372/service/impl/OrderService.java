package com.example.bil372.service.impl;

import com.example.bil372.dto.request.OrderRequest;
import com.example.bil372.dto.response.OrderItemResponse;
import com.example.bil372.dto.response.OrderResponse;
import com.example.bil372.model.*;
import com.example.bil372.repository.*;
import com.example.bil372.service.IOrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {
    private final OrderRepository orderRepository;
    private final ItemRepository itemRepository;
    private final CustomerRepository customerRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest orderRequest) {
        Customer customer = customerRepository.findById(orderRequest.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found!"));

        Employee employee = employeeRepository.findById(orderRequest.getEmployeeId())
                        .orElseThrow(() -> new RuntimeException("Employee not found!"));

        Order order = Order.builder()
                .orderDate(LocalDateTime.now())
                .customer(customer)
                .employee(employee)
                .status(STATUS.ORDER_RECEIVED)
                .totalPrice(BigDecimal.ZERO)
                .build();

        order = orderRepository.save(order); // ID almasi icin order'i kaydetmemiz lazim

        BigDecimal calculatedTotalPrice = BigDecimal.ZERO;
        List<OrderItem> orderItemList = new ArrayList<>();
        List<OrderItemResponse> orderItemResponseList = new ArrayList<>();

        for (var itemRequest : orderRequest.getOrderItems()) {
            Item item = itemRepository.findById(itemRequest.getItemID())
                    .orElseThrow(() -> new RuntimeException("Item not found! ID: " + itemRequest.getItemID()));

            BigDecimal itemPrice = item.getPrice();
            BigDecimal subTotal = itemPrice.multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            calculatedTotalPrice = calculatedTotalPrice.add(subTotal);

            OrderItem orderItem = OrderItem.builder()
                    .item(item)
                    .order(order)
                    .price(itemPrice)
                    .quantity(itemRequest.getQuantity())
                    .build();

            orderItemList.add(orderItem);

            orderItemResponseList.add(OrderItemResponse.builder()
                    .itemId(item.getId())
                    .itemName(item.getName())
                    .price(itemPrice)
                    .quantity(itemRequest.getQuantity())
                    .build());
        }

        order.setOrderItems(orderItemList);
        order.setTotalPrice(calculatedTotalPrice);

        // Cascade.ALL sayesinde OrderItem'lar da burada kaydedilecek.
        orderRepository.save(order);

        return orderResponseCreator(order);
    }

    @Override
    public List<OrderResponse> listOrder() {

        List<OrderResponse> orderResponseList = new ArrayList<>();

        orderRepository.findAllWithDetails().forEach(order -> {
            orderResponseList.add(orderResponseCreator(order));
        });

        return orderResponseList;
    }

    @Override
    public OrderResponse getOrderById(Long id) {
        Order order = orderRepository.findByIdWithDetails(id).orElseThrow(() -> new RuntimeException("Order not found! ID: " + id));
        return orderResponseCreator(order);
    }

    @Override
    public OrderResponse updateStatus(Long id) {
        Order order = orderRepository.findByIdWithDetails(id).orElseThrow(() -> new RuntimeException("Order not found! ID: " + id));
        if(order.getStatus().equals(STATUS.ORDER_RECEIVED)) {
            order.setStatus(STATUS.PREPARING);
            orderRepository.save(order);
        }else if(order.getStatus().equals(STATUS.PREPARING)) {
            order.setStatus(STATUS.READY);
            orderRepository.save(order);
        }else if(order.getStatus().equals(STATUS.READY)){

        }

        return orderResponseCreator(order);
    }

    @Override
    public OrderResponse cancelOrder(Long id) {
        Order order = orderRepository.findByIdWithDetails(id).orElseThrow(() -> new RuntimeException("Order not found! ID: " + id));

        if(order.getStatus().equals(STATUS.ORDER_RECEIVED)) {
            order.setStatus(STATUS.ORDER_CANCELED);
            orderRepository.save(order);
        }else{
            throw new RuntimeException("Order is preparing, cannot cancel order!");
        }

        return orderResponseCreator(order);
    }

    @Override
    public List<OrderResponse> getMyOrders(Long id) {
        List<Order> orders = orderRepository.findAllByCustomerId(id);

        if (orders.isEmpty()) {
            return new ArrayList<>();
        }

        List<OrderResponse> orderResponseList = new ArrayList<>();
        for (Order order : orders) {
            orderResponseList.add(orderResponseCreator(order));
        }

        return orderResponseList;
    }

    private OrderResponse orderResponseCreator(Order order){
        List<OrderItemResponse> orderItemResponseList = new ArrayList<>();
        order.getOrderItems().forEach(orderItem -> {
            OrderItemResponse orderItemResponse = OrderItemResponse.builder()
                    .itemId(orderItem.getItem().getId())
                    .itemName(orderItem.getItem().getName())
                    .price(orderItem.getPrice())
                    .quantity(orderItem.getQuantity())
                    .build();
            orderItemResponseList.add(orderItemResponse);
        });

        return OrderResponse.builder()
                .orderDate(order.getOrderDate())
                .customerId(order.getCustomer().getId())
                .employeeId(order.getEmployee().getId())
                .orderItems(orderItemResponseList)
                .status(order.getStatus())
                .totalPrice(order.getTotalPrice())
                .id(order.getId())
                .employeeName(order.getEmployee().getFirstName() + " " + order.getEmployee().getLastName())
                .customerName(order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName())
                .build();
    }
}
