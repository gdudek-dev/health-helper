package com.gdudek.healthhelperapi.exception;

import lombok.Getter;

@Getter
public class NotFoundException extends RuntimeException {
    private final String message;

    public NotFoundException() {
        this.message = "Entity not found";
    }
}
