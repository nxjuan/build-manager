package com.github.build_manager.application.build;

import com.github.build_manager.domain.entity.Build;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
public class BuildMapper {

    public Build mapToBuild(BuildDTO dto){
        return Build.builder()
                .name(dto.getName())
                .address(dto.getAddress())
                .build();
    }

}
