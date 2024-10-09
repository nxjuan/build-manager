package com.github.build_manager.domain.service;

import com.github.build_manager.domain.entity.Presence;

public interface PresenceService {
    Presence save (Presence presence);

    Presence update (Presence presence);
}
