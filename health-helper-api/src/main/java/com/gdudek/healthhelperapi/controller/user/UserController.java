package com.gdudek.healthhelperapi.controller.user;

import com.gdudek.healthhelperapi.controller.GenericController;
import com.gdudek.healthhelperapi.domain.user.UserEntity;
import com.gdudek.healthhelperapi.dto.user.UserDTO;
import com.gdudek.healthhelperapi.repository.GenericRepository;
import com.gdudek.healthhelperapi.request.UpdateEmailRequest;
import com.gdudek.healthhelperapi.request.UpdatePasswordRequest;
import com.gdudek.healthhelperapi.service.GenericMapper;
import com.gdudek.healthhelperapi.service.user.UserService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(originPatterns = "*", maxAge = 3600)
public class UserController extends GenericController<UserEntity, UserDTO> {

    private final UserService userService;

    public UserController(GenericRepository<UserEntity> repository, GenericMapper<UserEntity, UserDTO> mapper, UserService userService) {
        super(repository, mapper);
        this.userService = userService;
    }

    @GetMapping("/page")
    public Page<UserDTO> getPage(Pageable pageable) {
        return userService.findAllPageable(pageable);
    }

    @GetMapping("")
    public List<UserDTO> getAll() {
        return userService.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO userDTO) {
        return userService.register(userDTO);
    }

    @GetMapping("/session/logged")
    public UserDTO getLoggedUser(HttpServletRequest httpServletRequest) {
       String key =  httpServletRequest.getHeader("Authorization");
       return userService.getLoggedUser(key);
    }

    @PostMapping("/update/password")
    public Boolean updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest) {
        return this.userService.updatePassword(updatePasswordRequest);
    }

    @PostMapping("/update/email")
    public Boolean updateEmail(@RequestBody UpdateEmailRequest updateEmailRequest) {
        return this.userService.updateEmail(updateEmailRequest);
    }
}
