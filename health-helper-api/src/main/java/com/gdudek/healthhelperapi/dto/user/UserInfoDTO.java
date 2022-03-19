package com.gdudek.healthhelperapi.dto.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserInfoDTO {

    private Long Id;
    private int age;
    private String gender;
    private float height;
    private UserDTO userDTO;
}
