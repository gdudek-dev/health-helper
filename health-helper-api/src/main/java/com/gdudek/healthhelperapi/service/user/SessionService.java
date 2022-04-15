package com.gdudek.healthhelperapi.service.user;

import com.gdudek.healthhelperapi.dto.user.SessionDTO;

public interface SessionService {
    SessionDTO getBySessionKey(String sessionKey);
}
