package com.github.build_manager.application.presence;

import com.github.build_manager.domain.entity.Employee;
import com.github.build_manager.domain.entity.Presence;
import com.github.build_manager.domain.exceptions.ResourceNotFoundException;
import com.github.build_manager.domain.service.PresenceService;
import com.github.build_manager.infra.repository.EmployeeRepository;
import com.github.build_manager.infra.repository.PresenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PresenceServiceImpl implements PresenceService {

    private final PresenceRepository presenceRepository;
    private final EmployeeRepository employeeRepository;
    @Override
    @Transactional
    public Presence save(Presence presence) {
        presence.setPayed(false);
        if (presence.getStart_time_work() != null && presence.getEnd_time_work() != null) {
            Long durationInMinutes = Duration.between(presence.getStart_time_work(), presence.getEnd_time_work()).toMinutes();
            presence.setDuration_time_work(durationInMinutes);
        }
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


            if (presence.getStart_time_work() != null && presence.getEnd_time_work() != null) {
                // Calculate duration in minutes as a long value
                long durationInMinutes = ChronoUnit.MINUTES.between(
                        presence.getStart_time_work(),
                        presence.getEnd_time_work()
                );

                updatePresence.setDuration_time_work(durationInMinutes);
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
        Optional<Employee> existingEmployee = employeeRepository.findById(employee_id);
        if (existingEmployee.isPresent()){
            return presenceRepository.findAllByEmployeeId(employee_id);
        }
        else {
            throw new ResourceNotFoundException("Employee not found with ID: " + employee_id);
        }

    }

    @Override
    public List<Presence> findAll() {
        return presenceRepository.findAll();
    }

    @Override
    public List<Presence> payAllPresencesByEmployeeId(String employee_id) {
        List<Presence> presencesList = findAllByEmployeeId(employee_id);

        for (Presence presence : presencesList) {
            presence.setPayed(true);
        }

        return presenceRepository.saveAll(presencesList);
    }

}
