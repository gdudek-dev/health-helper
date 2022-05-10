package com.gdudek.healthhelperapi.domain.session;

import com.gdudek.healthhelperapi.domain.user.UserEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "session")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SessionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "session_key")
    private String sessionKey;

    @Column(name = "expiration_date")
    private LocalDateTime expirationDate;

    @Column(name = "has_do_not_logout")
    private Boolean hasDoNotLogout;

    @OneToOne(fetch = FetchType.LAZY,orphanRemoval=true)
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
