package com.gdudek.healthhelperapi.service;

import com.gdudek.healthhelperapi.exception.NotFoundException;
import com.gdudek.healthhelperapi.repository.GenericRepository;

import javax.transaction.Transactional;

public abstract class GenericService<T, V> {

    private final GenericMapper<T, V> mapper;
    private final GenericRepository<T> repository;

    protected GenericService(GenericMapper<T, V> mapper, GenericRepository<T> repository) {
        this.mapper = mapper;
        this.repository = repository;
    }

    public V get(Long id) {
        T dbEntity = repository.findById(id).orElseThrow(NotFoundException::new);
        return mapper.toDTO(dbEntity);
    }

    @Transactional
    public V create(V newEntity) {
        T dbEntity = mapper.fromDTO(newEntity);
        return mapper.toDTO(repository.save(dbEntity));
    }

    @Transactional
    public V update(V updated) {
        T dbEntity = mapper.fromDTO(updated);
        return mapper.toDTO(repository.save(dbEntity));
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
