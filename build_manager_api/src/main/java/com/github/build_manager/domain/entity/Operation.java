package com.github.build_manager.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Operation extends Users implements Serializable {

    @Column
    private String pix_key;

    @ManyToMany
    @JoinTable(
            name = "operator_precences",
            joinColumns = @JoinColumn(name = "operator_id"),
            inverseJoinColumns = @JoinColumn(name = "precence_id")
    )
    private List<Presence> presences; // Realizar mapeaemnto jpa com a entidade presence            REVISAR

    @ManyToMany
    @JoinTable(
            name = "operator_requests",
            joinColumns = @JoinColumn(name = "operator_id"),
            inverseJoinColumns = @JoinColumn(name = "request_id")
    )
    private List<Request> requests; // Realizar mapeaemnto jpa com a entidade Request                   REVISAR

    @ManyToMany(mappedBy = "operators")
    private List<Manager> managers;


}
