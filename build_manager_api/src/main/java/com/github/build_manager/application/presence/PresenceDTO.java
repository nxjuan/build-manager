package com.github.build_manager.application.presence;


import lombok.Data;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Data
public class PresenceDTO {
    private Date date;
    private Instant start_time_work;
    private Instant end_time_work;
    private Duration duration_time_work;
}
