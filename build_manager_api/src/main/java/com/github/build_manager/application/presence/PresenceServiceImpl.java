package com.github.build_manager.application.presence;

import com.github.build_manager.domain.entity.Presence;
import com.github.build_manager.domain.exceptions.ResourceNotFoundException;
import com.github.build_manager.domain.service.PresenceService;
import com.github.build_manager.infra.repository.PresenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PresenceServiceImpl implements PresenceService {

    private final PresenceRepository presenceRepository;
    @Override
    @Transactional
    public Presence save(Presence presence) {
        return presenceRepository.save(presence);
    }

    @Override
    public Presence update(Presence presence) {
        Optional<Presence> existingPresence = presenceRepository.findById(presence.getId());

        if(existingPresence.isPresent()){
            Presence updatePresence = existingPresence.get();

            updatePresence.setDate(presence.getDate());
            updatePresence.setStart_time_work(presence.getStart_time_work());
            updatePresence.setEnd_time_work(presence.getEnd_time_work());

            if (presence.getEmployee() != null && presence.getEmployee().getId() != null) {
                updatePresence.setEmployee(presence.getEmployee());
            }else{
                throw new ResourceNotFoundException("Employee not found with ID: " + presence.getEmployee());
            }

            // Verifica se start_time_work e end_time_work não são null
            if (presence.getStart_time_work() != null && presence.getEnd_time_work() != null) {
                Duration duration = Duration.between(
                        presence.getStart_time_work(),
                        presence.getEnd_time_work()
                );
                updatePresence.setDuration_time_work(duration);
            } else {
                updatePresence.setDuration_time_work(null); // ou um valor padrão, dependendo do que você deseja fazer
            }

            return presenceRepository.save((updatePresence));
        } else {
            throw new ResourceNotFoundException("Presence not found with ID: " + presence.getId());
        }
    }

    @Override
    public List<Presence> findAllByEmployeeId(String employee_id) {
        Optional<Presence> existingPresence = presenceRepository.findById(employee_id);
        if (existingPresence.isPresent()){
            return presenceRepository.findAllByEmployeeId(employee_id);
        }
        else {
            throw new ResourceNotFoundException("Build not found with ID: " + employee_id);
        }

    }
}
