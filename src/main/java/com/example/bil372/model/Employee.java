package com.example.bil372.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "employee")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee extends User{

    @Column(nullable = false)
    private BigDecimal salary;

    @Enumerated(EnumType.STRING)
    private EMPLOYEE_ROLE employeeRole;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Order> orders;
}
