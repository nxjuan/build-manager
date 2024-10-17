package com.github.build_manager.application.build;

import com.github.build_manager.domain.entity.Build;
import com.github.build_manager.domain.service.BuildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        Build buildToUpdate = buildMapper.mapToBuild(dto);
        buildToUpdate.setId(build_id);

        Build updatedBuild = buildService.update(buildToUpdate);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Build>> findAll(){
        return ResponseEntity.ok(buildService.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Build>> search(@RequestParam(value = "query", required = false) String query){
        var result = buildService.findByNameLike(query);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/getById/{build_id}")
    public ResponseEntity<Build> getById(@PathVariable String build_id ){
        var result = buildService.getById(build_id);
        return ResponseEntity.ok(result);
    }

}
