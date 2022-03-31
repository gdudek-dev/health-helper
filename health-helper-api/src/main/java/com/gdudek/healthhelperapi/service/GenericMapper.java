package com.gdudek.healthhelperapi.service;

import org.springframework.stereotype.Component;

@Component
public interface GenericMapper<T, V> {
    T fromDTO(V dtoEntity);
    V toDTO(T dbEntity);
}
