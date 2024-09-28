package com.github.build_manager.infra.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Request extends JpaRepository<Request, String> {
}
