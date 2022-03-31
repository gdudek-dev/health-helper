package com.gdudek.healthhelperapi.generic;

import com.gdudek.healthhelperapi.repository.GenericRepository;
import com.gdudek.healthhelperapi.service.GenericMapper;
import com.gdudek.healthhelperapi.service.GenericService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class GenericServiceTest {

    @Mock
    GenericRepository<Object> genericRepository;
    @Mock
    GenericMapper<Object, Object> genericMapper;
    GenericService<Object, Object> genericService;

    @BeforeEach
    void beforeEach() {
        genericService = new GenericService<>(genericMapper, genericRepository) {
        };
    }

    @Test
    void canAddEntity() {
        Object obj = new Object();
        genericService.create(obj);

        ArgumentCaptor<Object> objectArgumentCaptor =
                ArgumentCaptor.forClass(Object.class);

        verify(genericRepository).save(objectArgumentCaptor.capture());
    }

    @Test
    void canUpdateEntity() {
        Object obj = new Object();
        genericService.update(obj);

        ArgumentCaptor<Object> objectArgumentCaptor =
                ArgumentCaptor.forClass(Object.class);

        verify(genericRepository).save(objectArgumentCaptor.capture());
    }

    @Test
    void canDeleteEntity() {
        genericService.delete(anyLong());

        verify(genericRepository).deleteById(anyLong());
    }
}
