package com.gdudek.healthhelperapi.service.email.impl;

import com.gdudek.healthhelperapi.request.SendEmailRequest;
import com.gdudek.healthhelperapi.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.mail.javamail.JavaMailSenderImpl;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSenderImpl javaMailSender;

    @Override
    public Boolean sendEmail(SendEmailRequest emailRequest) {
        Properties props = new Properties();
        Session session = Session.getDefaultInstance(props, null);
        MimeMessage m = new MimeMessage(session);
        try {
            m.setReplyTo(InternetAddress.parse(emailRequest.getFrom()));
            m.setText(emailRequest.getMessage());
            m.setSubject(emailRequest.getSubject());
            m.setRecipients(Message.RecipientType.TO, "mizuapptest@gmail.com");
        } catch (MessagingException e) {
            return false;
        }
        javaMailSender.send(m);
        return true;
    }
}
