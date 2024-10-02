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
public class Manager extends Users implements Serializable {

    @OneToMany(mappedBy = "managers", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Operation> operators;

    @ManyToOne
    @JoinColumn(name = "build_id")
    private Build build;

}
