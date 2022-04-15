package com.gdudek.healthhelperapi.service.user.impl;

import com.gdudek.healthhelperapi.domain.session.SessionEntity;
import com.gdudek.healthhelperapi.dto.user.SessionDTO;
import com.gdudek.healthhelperapi.repository.user.SessionRepository;
import com.gdudek.healthhelperapi.service.user.SessionService;
import com.gdudek.healthhelperapi.service.user.mapper.SessionMapper;
import org.springframework.stereotype.Service;

@Service
public class SessionServiceImpl implements SessionService {

    private final SessionRepository sessionRepository;
    private final SessionMapper sessionMapper;

    public SessionServiceImpl(SessionRepository sessionRepository, SessionMapper sessionMapper) {
        this.sessionRepository = sessionRepository;
        this.sessionMapper = sessionMapper;
    }

    @Override
    public SessionDTO getBySessionKey(String sessionKey) {
        SessionEntity session = sessionRepository.getSessionBySessionKey(sessionKey);
        if (session != null) {
            return sessionMapper.toDTO(session);
        }
        return null;
    }
}
