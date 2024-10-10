package com.github.build_manager.domain.service;

import com.github.build_manager.domain.entity.Build;
import com.github.build_manager.domain.entity.Employee;
import com.github.build_manager.domain.entity.Manager;

import java.util.List;

public interface ManagerService {
    Manager save(Manager manager);

    Manager update(Manager manager);

    List<Manager> findAll();
}
