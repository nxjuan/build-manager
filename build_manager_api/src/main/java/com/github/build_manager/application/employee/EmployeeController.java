package com.github.build_manager.application.employee;

import com.github.build_manager.domain.entity.Build;
import com.github.build_manager.domain.entity.Employee;
import com.github.build_manager.domain.service.EmployeeService;
import com.github.build_manager.infra.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/v1/employee")
@RequiredArgsConstructor
@Slf4j
public class EmployeeController {

    private final EmployeeMapper employeeMapper;
    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity save(EmployeeDTO dto, Build build){
        Employee employee = employeeMapper.mapToEmployee(dto, build);
        employeeService.save(employee);

        return ResponseEntity.ok().build();
    }


}
