package com.gdudek.healthhelperapi.service.auth;

import com.gdudek.healthhelperapi.dto.user.SessionDTO;
import com.gdudek.healthhelperapi.request.LoginRequest;

public interface AuthService {

    SessionDTO login(LoginRequest loginRequest);

    Boolean isSessionAlive(SessionDTO sessionDTO);

    Boolean logout(String sessionKey);
}
