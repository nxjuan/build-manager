package com.github.build_manager.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serializable;
import java.time.Instant;

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

    // ADICIONAR O ENUM COM A O TIPO DE SOLICITAÇÃO AQUI


}
