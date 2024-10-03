package com.github.build_manager.application.presence;

import com.github.build_manager.domain.entity.Presence;
import com.github.build_manager.domain.service.PresenceService;
import com.github.build_manager.infra.repository.PresenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PresenceServiceImpl implements PresenceService {

    private final PresenceRepository presenceRepository;
    @Override
    @Transactional
    public Presence save(Presence presence) {
        return presenceRepository.save(presence);
    }
}
