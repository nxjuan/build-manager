package com.github.build_manager.application.employee;

import com.github.build_manager.domain.entity.Employee;
import com.github.build_manager.domain.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/employee")
@RequiredArgsConstructor
@Slf4j
public class EmployeeController {

    private final EmployeeMapper employeeMapper;
    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody EmployeeDTO dto){
        Employee employee = employeeMapper.mapToEmployee(dto);
        employeeService.save(employee);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{emp_id}")
    public ResponseEntity<EmployeeDTO> update(@PathVariable String emp_id, @RequestBody EmployeeDTO dto){
        Employee employeeToUpdate = employeeMapper.mapToEmployee(dto);
        employeeToUpdate.setId(emp_id);

        Employee updatedEmployee = employeeService.update(employeeToUpdate);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/getAllByBuild/{build_id}")
    public ResponseEntity<List<Employee>> findAllByBuildId(@PathVariable String build_id) {
        List<Employee> employees = employeeService.findAllByBuildId(build_id);
        return ResponseEntity.ok(employees);
    }

    @GetMapping
    public ResponseEntity<List<Employee>> findAll(){
        return ResponseEntity.ok(employeeService.findAll());
    }

}
