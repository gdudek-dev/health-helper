package com.gdudek.healthhelperapi.user;

import com.gdudek.healthhelperapi.domain.user.UserEntity;
import com.gdudek.healthhelperapi.repository.user.UserRepository;
import com.gdudek.healthhelperapi.service.user.UserService;
import com.gdudek.healthhelperapi.service.user.impl.UserServiceImpl;
import com.gdudek.healthhelperapi.service.user.mapper.UserMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private UserMapper userMapper;
    private UserService userService;

    @BeforeEach
    void beforeEach() {
        userService = new UserServiceImpl(userRepository, userMapper);
    }

    @Test
    void canGetAllUsers() {
            userService.findAll();

            verify(userRepository).findAll();
    }

    @Test
    void canGetAllUsersPageable() {
        Pageable pageable = PageRequest.of(0,5);
        Mockito.when(userRepository.findAll(pageable))
                .thenReturn(new PageImpl<>(List.of(new UserEntity())));
        userService.findAllPageable(pageable);

        verify(userRepository).findAll(pageable);
    }
}
