package com.github.build_manager.domain.service;

import com.github.build_manager.domain.entity.Presence;

import java.util.List;

public interface PresenceService {
    Presence save (Presence presence);

    Presence update (Presence presence);

    List<Presence> findAllByEmployeeId(String employee_id);

    List<Presence> findAll();

    List<Presence> payAllPresencesByEmployeeId(String presences);
}
