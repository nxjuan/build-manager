package com.github.build_manager.application.build;

import com.github.build_manager.domain.entity.Build;
import com.github.build_manager.domain.service.BuildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/build")
@RequiredArgsConstructor
public class BuildController {

    private final BuildMapper buildMapper;
    private final BuildService buildService;

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody BuildDTO dto){
        Build build = buildMapper.mapToBuild(dto);
        buildService.save(build);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{build_id}")
    public ResponseEntity<BuildDTO> update(@PathVariable String build_id, @RequestBody BuildDTO dto){
        String buildId = String.valueOf(build_id);

        Build buildToUpdate = buildMapper.mapToBuild(dto);
        buildToUpdate.setId(buildId);

        Build updatedBuild = buildService.update(buildToUpdate);

        return ResponseEntity.ok().build();
    }

}
