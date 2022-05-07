package com.gdudek.healthhelperapi.service.email;

import com.gdudek.healthhelperapi.request.SendEmailRequest;

public interface EmailService {
    Boolean sendEmail(SendEmailRequest emailRequest);
}
