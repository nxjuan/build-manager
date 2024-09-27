package com.github.build_manager.domain.entity;

import jakarta.persistence.Column;

import java.io.Serializable;
import java.util.List;

public class Operation extends Users implements Serializable {

    @Column
    private String pix_key;

    @Column
    private List<Presence> presences; // Realizar mapeaemnto jpa com a entidade presence

    @Column
    private List<Request> requests; // Realizar mapeaemnto jpa com a entidade Request
}
