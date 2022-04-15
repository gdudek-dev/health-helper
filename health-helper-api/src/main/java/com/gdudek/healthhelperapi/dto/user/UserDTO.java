package com.gdudek.healthhelperapi.dto.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private SessionDTO session;
    private Boolean isAdmin;
    private UserInfoDTO userInfoDTO;
}
