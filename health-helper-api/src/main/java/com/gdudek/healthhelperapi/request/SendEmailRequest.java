package com.gdudek.healthhelperapi.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendEmailRequest {
    private String from;
    private String message;
    private String subject;
}
