package com.gdudek.healthhelperapi.repository.user;

import com.gdudek.healthhelperapi.domain.user.UserEntity;
import com.gdudek.healthhelperapi.repository.GenericRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends GenericRepository<UserEntity> {
    @Query(value = "select u from UserEntity u inner join UserInfo ui on u.userInfo.id = ui.id")
    Page<UserEntity> findAll(Pageable pageable);

    @Query(value = "select u from UserEntity u inner join UserInfo ui on u.userInfo.id = ui.id")
    List<UserEntity> findAll();

    boolean existsByEmail(String email);
}
