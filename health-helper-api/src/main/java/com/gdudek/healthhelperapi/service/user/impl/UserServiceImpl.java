package com.gdudek.healthhelperapi.service.user.impl;

import com.gdudek.healthhelperapi.domain.user.UserEntity;
import com.gdudek.healthhelperapi.dto.user.UserDTO;
import com.gdudek.healthhelperapi.dto.user.UserInfoDTO;
import com.gdudek.healthhelperapi.exception.NotFoundException;
import com.gdudek.healthhelperapi.exception.user.EmailAlreadyTakenException;
import com.gdudek.healthhelperapi.repository.user.UserRepository;
import com.gdudek.healthhelperapi.request.UpdatePasswordRequest;
import com.gdudek.healthhelperapi.service.user.UserService;
import com.gdudek.healthhelperapi.service.user.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

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

    @Override
    public ResponseEntity<UserDTO> register(UserDTO userDTO) {
        if (isEmailTaken(userDTO.getEmail())) {
            throw new EmailAlreadyTakenException();
        }
        userDTO.setId(null);
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userDTO.setUserInfoDTO(UserInfoDTO.builder().build());
        userDTO.setIsAdmin(false);
        UserEntity dbUser = userMapper.fromDTO(userDTO);
        userRepository.save(dbUser);
        return ResponseEntity.ok(userDTO);
    }

    public UserDTO getLoggedUser(String sessionKey) {
        return userMapper.toDTO(
                userRepository
                        .getUserBySessionKey(sessionKey)
                        .orElseThrow(NotFoundException::new));
    }

    @Override
    public Boolean updatePassword(UpdatePasswordRequest updatePasswordRequest) {
        UserEntity user = userRepository.getUserBySessionKey(updatePasswordRequest.getSessionKey()).orElseThrow(NotFoundException::new);
        if(!passwordEncoder.matches(updatePasswordRequest.getPassword(),user.getPassword())) {
            return false;
        }
        user.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
        userRepository.save(user);

        return true;
    }

    private boolean isEmailTaken(String email) {
        return userRepository.existsByEmail(email);
    }
}
