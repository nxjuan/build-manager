package com.github.build_manager.application.managers;

import com.github.build_manager.domain.entity.Manager;
import com.github.build_manager.domain.service.ManagerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/manager")
@Slf4j //faz com que possamos usar o log
@RequiredArgsConstructor
public class ManagerController {

    private final ManagerMapper managerMapper;
    private final ManagerService managerService;


    @PostMapping
    public ResponseEntity save(@RequestBody ManagerDTO dto){
        Manager manager = managerMapper.matToManager(dto);
        managerService.save(manager);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{manager_id}")
    public ResponseEntity<ManagerDTO> update(@PathVariable String manager_id, @RequestBody ManagerDTO dto){
        Manager managerToUpdate = managerMapper.matToManager(dto);
        managerToUpdate.setId(manager_id);

        Manager updatedManager = managerService.update(managerToUpdate);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Manager>> findAll(){
        return ResponseEntity.ok(managerService.findAll());
    }

}
