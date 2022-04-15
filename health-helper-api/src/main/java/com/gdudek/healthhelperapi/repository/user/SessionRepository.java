package com.gdudek.healthhelperapi.repository.user;

import com.gdudek.healthhelperapi.domain.session.SessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface SessionRepository extends JpaRepository<SessionEntity, Long> {

    @Query("select s from SessionEntity s where s.sessionKey = :sessionKey")
    SessionEntity getSessionBySessionKey(String sessionKey);

    @Modifying
    @Transactional
    @Query(value = "delete from SessionEntity s where s.sessionKey = :sessionKey")
    Integer deleteSessionBySessionKey(String sessionKey);
}
