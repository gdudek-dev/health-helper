package com.gdudek.healthhelperapi.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordRequest {
    String sessionKey;
    String password;
    String newPassword;
}
