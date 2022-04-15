package com.gdudek.healthhelperapi.exception.user;

import lombok.Getter;

@Getter
public class SessionNotFoundException extends RuntimeException {
    private final String message;

    public SessionNotFoundException() {
        this.message = "Session key not found";
    }
}
