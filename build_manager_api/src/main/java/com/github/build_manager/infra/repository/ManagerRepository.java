package com.github.build_manager.infra.repository;

import com.github.build_manager.domain.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager, String> {
}
