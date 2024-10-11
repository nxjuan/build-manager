package com.github.build_manager.domain.service;

import com.github.build_manager.domain.entity.Build;

import java.util.List;

public interface BuildService {
    Build save(Build build);

    Build update(Build build);

    List<Build> findAll();

    List<Build> findByNameLike(String query);
}
