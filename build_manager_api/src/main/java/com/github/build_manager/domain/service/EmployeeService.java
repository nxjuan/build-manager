package com.github.build_manager.domain.service;

import com.github.build_manager.domain.entity.Employee;

public interface EmployeeService {
    Employee save(Employee operation);

    Employee update(Employee employee);
}
