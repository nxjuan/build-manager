package com.github.build_manager.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serializable;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;

public class Presence implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column
    private Date date;

    @Column
    private Instant start;

    @Column
    private Instant end;

    @Column
    private Duration duration;
}
