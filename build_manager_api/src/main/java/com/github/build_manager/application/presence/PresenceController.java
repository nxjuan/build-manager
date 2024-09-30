package com.github.build_manager.application.presence;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/v1/presence")
@Slf4j
public class PresenceController {
    @PostMapping
    public ResponseEntity save(){
        return ResponseEntity.ok().build();
    }
}
