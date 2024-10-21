package com.github.build_manager.application.employee;

import com.github.build_manager.domain.entity.Employee;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper {
    public Employee mapToEmployee(EmployeeDTO dto){
        return Employee
                .builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .presences(dto.getPresences())
                .pix_key(dto.getPix_key())
                .hourly_rate(dto.getHourly_rate())
                .overtime_value(dto.getOvertime_value())
                .sunday_value(dto.getSunday_value())
                .build(dto.getBuild())
                .build();
    }
}
