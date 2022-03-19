package com.gdudek.healthhelperapi.dto.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDTO {

    private Long Id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private UserInfoDTO userInfoDTO;
}
