package com.github.build_manager.application.presence;

import com.github.build_manager.domain.entity.Presence;
import com.github.build_manager.domain.service.PresenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
