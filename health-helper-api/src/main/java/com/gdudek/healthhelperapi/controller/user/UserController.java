package com.gdudek.healthhelperapi.controller.user;

import com.gdudek.healthhelperapi.controller.GenericController;
import com.gdudek.healthhelperapi.domain.user.UserEntity;
import com.gdudek.healthhelperapi.dto.user.UserDTO;
import com.gdudek.healthhelperapi.repository.GenericRepository;
import com.gdudek.healthhelperapi.service.GenericMapper;
import com.gdudek.healthhelperapi.service.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

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
    @ResponseBody
    public Page<UserDTO> getPage(Pageable pageable) {
        return userService.findAllPageable(pageable);
    }

    @GetMapping("")
    @ResponseBody
    public List<UserDTO> getAll() {
        return userService.findAll();
    }
}