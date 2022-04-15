package com.gdudek.healthhelperapi.service.user.mapper;

import com.gdudek.healthhelperapi.domain.session.SessionEntity;
import com.gdudek.healthhelperapi.dto.user.SessionDTO;
import com.gdudek.healthhelperapi.service.GenericMapper;
import org.springframework.stereotype.Component;

@Component
public class SessionMapper implements GenericMapper<SessionEntity, SessionDTO> {

    @Override
    public SessionEntity fromDTO(SessionDTO dtoEntity) {
        return SessionEntity.builder()
                .id(dtoEntity.getId())
                .sessionKey(dtoEntity.getSessionKey())
                .expirationDate(dtoEntity.getExpirationDate())
                .hasDoNotLogout(dtoEntity.getHasDoNotLogout())
                .build();
    }

    @Override
    public SessionDTO toDTO(SessionEntity dbEntity) {
        return SessionDTO.builder()
                .id(dbEntity.getId())
                .sessionKey(dbEntity.getSessionKey())
                .expirationDate(dbEntity.getExpirationDate())
                .hasDoNotLogout(dbEntity.getHasDoNotLogout())
                .build();
    }
}
