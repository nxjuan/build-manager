package com.github.build_manager.application.build;

import com.github.build_manager.domain.entity.Build;
import com.github.build_manager.domain.service.BuildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/build")
@RequiredArgsConstructor
public class BuildController {

    private final BuildMapper buildMapper;
    private final BuildService buildService;

    @PostMapping
    public ResponseEntity save(@RequestBody BuildDTO dto){
        Build build = buildMapper.mapToBuild(dto);
        buildService.save(build);

        return ResponseEntity.ok().build();
    }

}
