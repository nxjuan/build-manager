package com.github.build_manager.application.build;

import com.github.build_manager.domain.entity.Build;
import org.springframework.stereotype.Component;

@Component
public class BuildMapper {

    public Build mapToBuild(BuildDTO dto){
        return Build.builder()
                .name(dto.getName())
                .cep(dto.getCep())
                .state(dto.getState())
                .city(dto.getCity())
                .color(dto.getColor())
                .build();
    }
}
