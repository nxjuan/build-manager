package com.github.build_manager.application.build;

import com.github.build_manager.domain.entity.Build;
import com.github.build_manager.domain.service.BuildService;
import com.github.build_manager.infra.repository.BuildRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BuildServiceImpl implements BuildService {

    private final BuildRepository buildRepository;

    @Override
    public Build save(Build build) {
        return buildRepository.save(build);
    }
}
