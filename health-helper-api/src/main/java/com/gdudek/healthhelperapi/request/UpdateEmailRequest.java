package com.gdudek.healthhelperapi.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateEmailRequest {
    String sessionKey;
    String password;
    String newEmail;
}
