package com.gdudek.healthhelperapi.repository.user;

import com.gdudek.healthhelperapi.domain.user.UserEntity;
import com.gdudek.healthhelperapi.repository.GenericRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends GenericRepository<UserEntity> {
    @Query(value = "select u from UserEntity u inner join UserInfo ui on u.userInfo.id = ui.id")
    Page<UserEntity> findAll(Pageable pageable);

    @Query(value = "select u from UserEntity u inner join UserInfo ui on u.userInfo.id = ui.id")
    List<UserEntity> findAll();

    @Query(value = "select s from UserEntity s where s.session is not null")
    List<UserEntity> getAllWhereSessionIsNotNull();

    @Query("select s from UserEntity s where s.email = :email")
    Optional<UserEntity> getUserByEmail(String email);

    @Query(value = "select u from UserEntity u inner join SessionEntity se on se.id = u.session.id where se.sessionKey = :sessionKey")
    Optional<UserEntity> getUserBySessionKey(String sessionKey);

    boolean existsByEmail(String email);
}
