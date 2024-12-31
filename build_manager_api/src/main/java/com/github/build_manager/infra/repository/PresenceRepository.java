package com.github.build_manager.infra.repository;

import com.github.build_manager.domain.entity.Presence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PresenceRepository extends JpaRepository<Presence, String> {
    List<Presence> findAllByEmployeeId(String employee_id);

}
