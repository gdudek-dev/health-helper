package com.gdudek.healthhelperapi.service.user.impl;

import com.gdudek.healthhelperapi.dto.user.UserDTO;
import com.gdudek.healthhelperapi.repository.user.UserRepository;
import com.gdudek.healthhelperapi.service.user.UserService;
import com.gdudek.healthhelperapi.service.user.mapper.UserMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public List<UserDTO> findAll() {
        return userRepository.findAll().stream().map(userMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public Page<UserDTO> findAllPageable(Pageable pageable) {
        return userRepository.findAll(pageable).map(userMapper::toDTO);
    }
}
