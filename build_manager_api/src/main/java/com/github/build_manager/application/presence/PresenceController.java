package com.github.build_manager.application.presence;

import com.github.build_manager.domain.entity.Presence;
import com.github.build_manager.domain.service.PresenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/{presence_id}")
    public ResponseEntity<PresenceDTO> update(@PathVariable String presence_id, @RequestBody PresenceDTO dto){
        Presence presenceToUpdate = presenceMapper.mapToPresence(dto);
        presenceToUpdate.setId(presence_id);

        Presence updatedPresence = presenceService.update(presenceToUpdate);

        return ResponseEntity.ok().build();
    }

}
