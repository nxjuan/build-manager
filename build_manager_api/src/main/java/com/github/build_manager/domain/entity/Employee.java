package com.github.build_manager.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.List;

@Entity
@Table
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Employee extends Users implements Serializable {

    @Column
    private String pix_key;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Presence> presences; // Realizar mapeaemnto jpa com a entidade presence            REVISAR

    @ManyToOne
    @JoinColumn(name = "build_id")
    private Build build;

}