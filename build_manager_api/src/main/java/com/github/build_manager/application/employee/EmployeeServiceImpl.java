package com.github.build_manager.application.employee;

import com.github.build_manager.domain.entity.Employee;
import com.github.build_manager.domain.service.EmployeeService;
import com.github.build_manager.infra.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository operationRepository;

    @Override
    @Transactional
    public Employee save(Employee operation) {
        return operationRepository.save((operation));
    }
}
