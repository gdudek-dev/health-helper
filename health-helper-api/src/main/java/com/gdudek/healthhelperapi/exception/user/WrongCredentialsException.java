package com.gdudek.healthhelperapi.exception.user;

import lombok.Getter;

@Getter
public class WrongCredentialsException extends RuntimeException {
    private final String message;

    public WrongCredentialsException() {
        this.message = "Wrong email or password";
    }
}
