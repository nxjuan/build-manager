package com.github.build_manager.application.presence;

import com.github.build_manager.domain.entity.Presence;
import com.github.build_manager.domain.service.PresenceService;
import com.github.build_manager.infra.repository.PresenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/v1/presence")
@RequiredArgsConstructor
public class PresenceController {

    private final PresenceMapper presenceMapper;
    private final PresenceService presenceService;

    @PostMapping
    public ResponseEntity save(@RequestBody PresenceDTO dto){
        Presence presence = presenceMapper.mapToPresence(dto);

        presenceService.save(presence);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PatchMapping("/payAllPresencesByEmployeeId/{employee_id}")
    public ResponseEntity payAllPresencesByEmployeeId(@PathVariable String employee_id){
        presenceService.payAllPresencesByEmployeeId(employee_id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/{presence_id}")
    public ResponseEntity<PresenceDTO> update(@PathVariable String presence_id, @RequestBody PresenceDTO dto){
        Presence presenceToUpdate = presenceMapper.mapToPresence(dto);
        presenceToUpdate.setId(presence_id);

        Presence updatedPresence = presenceService.update(presenceToUpdate);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/getAllByEmployeeId/{employee_id}")
    public ResponseEntity<List<Presence>> findAllByEmployeeId(@PathVariable String employee_id){
        List<Presence> presences = presenceService.findAllByEmployeeId(employee_id);
        return ResponseEntity.ok(presences);
    }

    @GetMapping
    public ResponseEntity<List<Presence>> findAll(){
        return ResponseEntity.ok(presenceService.findAll());
    }

}
