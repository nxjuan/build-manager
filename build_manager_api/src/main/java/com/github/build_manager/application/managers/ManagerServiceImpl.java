package com.github.build_manager.application.managers;

import com.github.build_manager.domain.entity.Manager;
import com.github.build_manager.domain.exceptions.ResourceNotFoundException;
import com.github.build_manager.domain.service.ManagerService;
import com.github.build_manager.infra.repository.EmployeeRepository;
import com.github.build_manager.infra.repository.ManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ManagerServiceImpl implements ManagerService {

    private final ManagerRepository managerRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    @Transactional
    public Manager save(Manager manager) {
        return managerRepository.save(manager);
    }

    @Override
    public Manager update(Manager manager) {
        Optional<Manager> existingManager = managerRepository.findById(manager.getId());
        if (existingManager.isPresent()){
            Manager updateManager = existingManager.get();

            updateManager.setName(manager.getName());
            updateManager.setEmail(manager.getEmail());
            updateManager.setPassword(manager.getPassword());
            updateManager.setBuild(manager.getBuild());

            return managerRepository.save(updateManager);
        } else {
            throw new ResourceNotFoundException("Manager not found with ID: " + manager.getId());
        }
    }

}
