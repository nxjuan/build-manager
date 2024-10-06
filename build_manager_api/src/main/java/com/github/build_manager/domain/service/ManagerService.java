package com.github.build_manager.domain.service;

import com.github.build_manager.domain.entity.Build;
import com.github.build_manager.domain.entity.Employee;
import com.github.build_manager.domain.entity.Manager;

public interface ManagerService {
    Manager save(Manager manager);

    Employee saveNewEmployee(Employee employee);

    Build getBuildByManagerId(String managerId);
}
