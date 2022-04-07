package com.gdudek.healthhelperapi.exception.user;

import lombok.Getter;

@Getter
public class EmailAlreadyTakenException extends RuntimeException {
    private final String message;

    public EmailAlreadyTakenException() {
        this.message = "This email is already registered";
    }
}
