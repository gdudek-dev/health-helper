package com.gdudek.healthhelperapi.controller;

import com.gdudek.healthhelperapi.repository.GenericRepository;
import com.gdudek.healthhelperapi.service.GenericMapper;
import com.gdudek.healthhelperapi.service.GenericService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public class GenericController<T, V> {

    private final GenericService<T, V> service;

    public GenericController(GenericRepository<T> repository, GenericMapper<T, V> mapper) {
        this.service = new GenericService<T, V>(mapper,repository) {
        };
    }

    @GetMapping("/{id}")
    @ResponseBody
    public V get(@PathVariable Long id){
        return service.get(id);
    }

    @PostMapping("")
    public ResponseEntity<V> create(@RequestBody V created){
        return ResponseEntity.ok(service.create(created));
    }

    @PutMapping("")
    public ResponseEntity<V> update(@RequestBody V updated) {
        return ResponseEntity.ok(service.update(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.status(200).build();
    }
}
