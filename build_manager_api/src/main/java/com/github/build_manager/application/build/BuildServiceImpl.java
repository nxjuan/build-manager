package com.github.build_manager.application.build;

import com.github.build_manager.domain.ResourceNotFoundException;
import com.github.build_manager.domain.entity.Build;
import com.github.build_manager.domain.service.BuildService;
import com.github.build_manager.infra.repository.BuildRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BuildServiceImpl implements BuildService {

    private final BuildRepository buildRepository;

    @Override
    public Build save(Build build) {
        return buildRepository.save(build);
    }

    @Override
    public Build update(Build build) {
        Optional<Build> existingBuild = buildRepository.findById(build.getId());
        if (existingBuild.isPresent()) {
            Build updatedBuild = existingBuild.get();

            updatedBuild.setName(build.getName());
            updatedBuild.setAddress(build.getAddress());

            return buildRepository.save(updatedBuild);
        } else {
            throw new ResourceNotFoundException("Build not found with ID: " + build.getId());
        }
    }
}
