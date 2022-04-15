package com.gdudek.healthhelperapi.controller.auth;

import com.gdudek.healthhelperapi.dto.user.SessionDTO;
import com.gdudek.healthhelperapi.request.LoginRequest;
import com.gdudek.healthhelperapi.service.auth.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(originPatterns = "*", maxAge = 3600)
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public SessionDTO login(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @DeleteMapping("/logout")
    @ResponseStatus(HttpStatus.OK)
    public Boolean logout(@RequestHeader(value = "sessionKey") String sessionKey) {
        return authService.logout(sessionKey);
    }

    @PostMapping("/session/check-alive-session")
    public Boolean isSessionAlive(@RequestBody SessionDTO sessionDTO) {
        return this.authService.isSessionAlive(sessionDTO);
    }
}
