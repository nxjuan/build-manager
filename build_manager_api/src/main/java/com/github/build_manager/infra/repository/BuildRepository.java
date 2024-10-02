package com.github.build_manager.infra.repository;

import com.github.build_manager.domain.entity.Build;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuildRepository extends JpaRepository<Build, String> {
}
