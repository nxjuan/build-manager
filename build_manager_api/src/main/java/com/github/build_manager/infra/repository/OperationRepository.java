package com.github.build_manager.infra.repository;

import com.github.build_manager.domain.entity.Operation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperationRepository extends JpaRepository<Operation, String> {
}
