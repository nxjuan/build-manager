package com.github.build_manager.application.operation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/v1/operation")
@Slf4j
public class EmployeeController {
    @PostMapping
    public ResponseEntity save
            (
                    @RequestParam("name") String name,
                    @RequestParam("email") String email,
                    @RequestParam("password") String password,
                    @RequestParam(value = "photo", required = false) MultipartFile photo // a foto de perfil é opcional poivai existir a foto default do icone cinza
            ){
        log.info("dados recebidos: nome {}, email {}, senha {}", name, email, password);
        return ResponseEntity.ok().build();
    }
}
