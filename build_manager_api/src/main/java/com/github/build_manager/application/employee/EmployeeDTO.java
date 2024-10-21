package com.github.build_manager.application.employee;

import com.github.build_manager.domain.entity.Build;
import com.github.build_manager.domain.entity.Presence;
import lombok.Data;

import java.util.List;

@Data
public class EmployeeDTO {

    private String name;
    private String email;
    private String pix_key;
    private List<Presence> presences;
    private Build build;
    private String password;
    private Long hourly_rate;
    private Long overtime_value;
    private Long sunday_value;

}
