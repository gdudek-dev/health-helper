package com.gdudek.healthhelperapi.repository.user;

import com.gdudek.healthhelperapi.domain.user.UserInfo;
import com.gdudek.healthhelperapi.repository.GenericRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepository extends GenericRepository<UserInfo> {
}
