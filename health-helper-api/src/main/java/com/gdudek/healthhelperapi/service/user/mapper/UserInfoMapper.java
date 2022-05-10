package com.gdudek.healthhelperapi.service.user.mapper;

import com.gdudek.healthhelperapi.domain.user.UserInfo;
import com.gdudek.healthhelperapi.dto.user.UserInfoDTO;
import com.gdudek.healthhelperapi.service.GenericMapper;
import org.springframework.stereotype.Component;

@Component
public class UserInfoMapper implements GenericMapper<UserInfo, UserInfoDTO> {

    @Override
    public UserInfo fromDTO(UserInfoDTO dtoEntity) {
        return UserInfo.builder()
                .id(dtoEntity.getId())
                .age(dtoEntity.getAge())
                .gender(dtoEntity.getGender())
                .height(dtoEntity.getHeight())
                .weight(dtoEntity.getWeight())
                .build();
    }

    @Override
    public UserInfoDTO toDTO(UserInfo dbEntity) {
        return UserInfoDTO.builder()
                .id(dbEntity.getId())
                .age(dbEntity.getAge())
                .gender(dbEntity.getGender())
                .height(dbEntity.getHeight())
                .weight(dbEntity.getWeight())
                .build();
    }
}
