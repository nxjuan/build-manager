package com.github.build_manager.application.presence;


import com.github.build_manager.domain.entity.Employee;
import com.github.build_manager.domain.enums.PresenceType;
import lombok.Data;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Data
public class PresenceDTO {
    private String id;
    private Date date;
    private Instant start_time_work;
    private Instant end_time_work;
    private Long duration_time_work;
    private Employee employee;
    private PresenceType presence_type;
    private boolean payed;
}
