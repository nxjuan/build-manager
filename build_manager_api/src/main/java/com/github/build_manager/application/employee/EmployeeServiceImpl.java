package com.github.build_manager.application.employee;

import com.github.build_manager.domain.entity.Build;
import com.github.build_manager.domain.exceptions.ResourceNotFoundException;
import com.github.build_manager.domain.entity.Employee;
import com.github.build_manager.domain.service.BuildService;
import com.github.build_manager.domain.service.EmployeeService;
import com.github.build_manager.infra.repository.BuildRepository;
import com.github.build_manager.infra.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final BuildRepository buildRepository;

    @Override
    @Transactional
    public Employee save(Employee operation) {
        return employeeRepository.save((operation));
    }

    @Override
    public Employee update(Employee employee) {
        Optional<Employee> existingEmployee = employeeRepository.findById(employee.getId());
        if (existingEmployee.isPresent()){
            Employee updateEmployee = existingEmployee.get();

            updateEmployee.setName(employee.getName());
            updateEmployee.setEmail(employee.getEmail());
            updateEmployee.setPix_key(employee.getPix_key());
            updateEmployee.setPassword(employee.getPassword());
            updateEmployee.setBuild(employee.getBuild());
            return employeeRepository.save(updateEmployee);
        } else {
            throw new ResourceNotFoundException("Employee not found with ID: " + employee.getId());
        }
    }

    @Override
    public List<Employee> findAllByBuildId(String build_id) {
        Optional<Build> existingBuild = buildRepository.findById(build_id);
        if(existingBuild.isPresent()){
            return employeeRepository.findAllByBuildId(build_id);
        }
        else {
            throw new ResourceNotFoundException("Build not found with ID: " + build_id);
        }
    }
}
