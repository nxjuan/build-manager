package com.github.build_manager.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Build {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column
    private String address;

    @Column
    private String name;

    @OneToMany(mappedBy = "build")
    private List<Manager> managers;

    @OneToMany(mappedBy = "build", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Employee> employees;

}
