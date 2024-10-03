package com.github.build_manager.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Presence implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column
    private Date date;

    @Column
    private Instant start_time_work;

    @Column
    private Instant end_time_work;

    @Column
    private Duration duration_time_work;

    @ManyToOne
    @JoinColumn(name = "operator_id")
    private Operation operator;


}
