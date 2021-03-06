package com.gdudek.healthhelperapi.service.user.mapper;

import com.gdudek.healthhelperapi.domain.user.UserEntity;
import com.gdudek.healthhelperapi.dto.user.UserDTO;
import com.gdudek.healthhelperapi.service.GenericMapper;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements GenericMapper<UserEntity, UserDTO> {

    private final UserInfoMapper userInfoMapper = new UserInfoMapper();
    private final SessionMapper sessionMapper = new SessionMapper();

    @Override
    public UserEntity fromDTO(UserDTO dtoEntity) {
        return UserEntity.builder()
                .id(dtoEntity.getId()).firstName(dtoEntity.getFirstName())
                .lastName(dtoEntity.getLastName())
                .email(dtoEntity.getEmail())
                .password(dtoEntity.getPassword())
                .isAdmin(dtoEntity.getIsAdmin())
                .session(dtoEntity.getSession() != null? sessionMapper.fromDTO(dtoEntity.getSession()): null)
                .userInfo(userInfoMapper.fromDTO(dtoEntity.getUserInfoDTO()))
                .build();
    }

    @Override
    public UserDTO toDTO(UserEntity dbEntity) {
        return UserDTO.builder()
                .id(dbEntity.getId()).firstName(dbEntity.getFirstName())
                .lastName(dbEntity.getLastName())
                .email(dbEntity.getEmail())
                .password(dbEntity.getPassword())
                .isAdmin(dbEntity.getIsAdmin())
                .session(dbEntity.getSession() != null ? sessionMapper.toDTO(dbEntity.getSession()) : null)
                .userInfoDTO(userInfoMapper.toDTO(dbEntity.getUserInfo()))
                .build();
    }
}
