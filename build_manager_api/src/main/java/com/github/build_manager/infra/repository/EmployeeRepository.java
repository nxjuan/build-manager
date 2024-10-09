package com.github.build_manager.infra.repository;

import com.github.build_manager.domain.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, String> {

    List<Employee> findAllByBuildId(String build_id);

}
