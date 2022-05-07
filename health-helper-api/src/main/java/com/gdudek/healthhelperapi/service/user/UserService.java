package com.gdudek.healthhelperapi.service.user;

import com.gdudek.healthhelperapi.dto.user.UserDTO;
import com.gdudek.healthhelperapi.request.UpdateEmailRequest;
import com.gdudek.healthhelperapi.request.UpdatePasswordRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    List<UserDTO> findAll();
    Page<UserDTO> findAllPageable(Pageable pageable);
    ResponseEntity<UserDTO> register(UserDTO userDTO);
    UserDTO getLoggedUser(String sessionKey);
    Boolean updatePassword(UpdatePasswordRequest updatePasswordRequest);
    Boolean updateEmail(UpdateEmailRequest updateEmailRequest);
}
