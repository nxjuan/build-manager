package com.github.build_manager.application.managers;

import com.github.build_manager.domain.entity.Build;
import com.github.build_manager.domain.entity.Employee;
import lombok.Data;

import java.util.List;

@Data
public class ManagerDTO {
    private String name;
    private String email;
    private String password;
    private  List<Employee> employees;
    private Build build;
}
