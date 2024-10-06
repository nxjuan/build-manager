package com.github.build_manager.application.managers;

import com.github.build_manager.application.employee.EmployeeDTO;
import com.github.build_manager.application.employee.EmployeeMapper;
import com.github.build_manager.domain.entity.Build;
import com.github.build_manager.domain.entity.Employee;
import com.github.build_manager.domain.entity.Manager;
import com.github.build_manager.domain.service.EmployeeService;
import com.github.build_manager.domain.service.ManagerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/manager")
@Slf4j //faz com que possamos usar o log
@RequiredArgsConstructor
public class ManagerController {

    private final ManagerMapper mapperService;
    private final ManagerService managerService;

    private final EmployeeMapper employeeMapper;
    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity save(@RequestBody ManagerDTO dto){
        Manager manager = mapperService.matToManager(dto);
        managerService.save(manager);
        return ResponseEntity.ok().build();
    }

}
