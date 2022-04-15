package com.gdudek.healthhelperapi.dto.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class SessionDTO {
    private Long id;
    private String sessionKey;
    private LocalDateTime expirationDate;
    private Boolean hasDoNotLogout;
    private Boolean isAdmin;
}
