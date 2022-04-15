package com.gdudek.healthhelperapi.service.auth.impl;

import com.gdudek.healthhelperapi.domain.session.SessionEntity;
import com.gdudek.healthhelperapi.domain.user.UserEntity;
import com.gdudek.healthhelperapi.dto.user.SessionDTO;
import com.gdudek.healthhelperapi.exception.user.SessionNotFoundException;
import com.gdudek.healthhelperapi.exception.user.WrongCredentialsException;
import com.gdudek.healthhelperapi.repository.user.SessionRepository;
import com.gdudek.healthhelperapi.repository.user.UserRepository;
import com.gdudek.healthhelperapi.request.LoginRequest;
import com.gdudek.healthhelperapi.service.auth.AuthService;
import com.gdudek.healthhelperapi.service.user.SessionService;
import com.gdudek.healthhelperapi.service.user.mapper.SessionMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;
    private final PasswordEncoder passwordEncoder;
    private final SessionMapper sessionMapper;
    private final SessionService sessionService;

    @Value("45")
    private Integer loginTime;

    public AuthServiceImpl(UserRepository userRepository,
                           SessionRepository sessionRepository,
                           PasswordEncoder passwordEncoder,
                           SessionMapper sessionMapper,
                           SessionService sessionService) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.passwordEncoder = passwordEncoder;
        this.sessionMapper = sessionMapper;
        this.sessionService = sessionService;
    }

    @Override
    public SessionDTO login(LoginRequest loginRequest) {
        UserEntity user = userRepository.getUserByEmail(loginRequest.getEmail()).orElseThrow(WrongCredentialsException::new);

        if (loginRequest.getPassword() == null ){
            throw new WrongCredentialsException();
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new WrongCredentialsException();
        }

        SessionEntity session = SessionEntity.builder()
                .sessionKey(UUID.randomUUID().toString())
                .expirationDate(LocalDateTime.now().plusMinutes(loginTime))
                .hasDoNotLogout(loginRequest.isHasDoNotLogout())
                .user(user)
                .build();
        user.setSession(session);
        userRepository.save(user);
        SessionDTO sessionDTO = sessionMapper.toDTO(session);
        sessionDTO.setIsAdmin(user.getIsAdmin());

        return sessionDTO;
    }

    @Override
    public Boolean isSessionAlive(SessionDTO sessionDTO) {
        SessionDTO session = sessionService.getBySessionKey(sessionDTO.getSessionKey());
        return session != null;
    }

    @Override
    public Boolean logout(String sessionKey) {
        UserEntity user = userRepository.getUserBySessionKey(sessionKey).orElseThrow(SessionNotFoundException::new);
        String sessionEntityKey = user.getSession().getSessionKey();
        user.setSession(null);
        userRepository.save(user);
        sessionRepository.deleteSessionBySessionKey(sessionEntityKey);
        return true;
    }
}
