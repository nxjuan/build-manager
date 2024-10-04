package com.github.build_manager.application.operation;

import com.github.build_manager.domain.entity.Manager;
import com.github.build_manager.domain.entity.Presence;
import lombok.Data;

import java.util.List;

@Data
public class EmployeeDTO {

    private String name;
    private String email;
    private String pix_key;
    private List<Presence> presences;
    private Manager manager;
    private String password;

}
