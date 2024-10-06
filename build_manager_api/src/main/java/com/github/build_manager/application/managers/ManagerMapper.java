package com.github.build_manager.application.managers;

import com.github.build_manager.domain.entity.Manager;
import org.springframework.stereotype.Component;

@Component
public class ManagerMapper {
    public Manager matToManager(ManagerDTO dto){
        return Manager.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .build(dto.getBuild())
                .build();
    }
}
