package com.gdudek.healthhelperapi.service.user;

import com.gdudek.healthhelperapi.dto.user.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    List<UserDTO> findAll();
    Page<UserDTO> findAllPageable(Pageable pageable);
    ResponseEntity<UserDTO> register(UserDTO userDTO);
    UserDTO getLoggedUser(String sessionKey);
}
