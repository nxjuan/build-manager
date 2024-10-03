package com.github.build_manager.application.presence;

import com.github.build_manager.domain.entity.Presence;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Component
public class PresenceMapper {

    public Presence mapToPresence(PresenceDTO dto){
        return Presence.builder()
                .date(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()))
                .start_time_work(dto.getStart_time_work())
                .end_time_work(dto.getEnd_time_work())
                .duration_time_work(dto.getDuration_time_work())
                .build();
    }
}
