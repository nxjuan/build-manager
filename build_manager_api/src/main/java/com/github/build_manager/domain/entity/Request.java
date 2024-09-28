package com.github.build_manager.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Request implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column
    private Instant datetime;

    @Column
    private Double value;

    @Column
    private String description;

    @ManyToMany(mappedBy = "requests")
    private List<Operation> operator;

    // ADICIONAR O ENUM COM A O TIPO DE SOLICITAÇÃO AQUI


}
