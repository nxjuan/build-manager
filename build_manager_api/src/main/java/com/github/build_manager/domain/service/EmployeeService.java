package com.github.build_manager.domain.service;

import com.github.build_manager.domain.entity.Employee;

import java.util.List;

public interface EmployeeService {
    Employee save(Employee operation);

    Employee update(Employee employee);

    List<Employee> findAllByBuildId(String build_id);
}
