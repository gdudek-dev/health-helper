package com.gdudek.healthhelperapi.user;

import com.gdudek.healthhelperapi.domain.user.UserEntity;
import com.gdudek.healthhelperapi.domain.user.UserInfo;
import com.gdudek.healthhelperapi.repository.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

@RunWith(MockitoJUnitRunner.class)
class UserRepositoryTest {

    private UserEntity user;
    private UserInfo userInfo;

    @BeforeEach
    void setUp() {
        user = new UserEntity(1L,"Tony","Test","Test321","Test",null,false, null);
        userInfo = new UserInfo(1L,22,"Men",180,120,user);
        user.setUserInfo(userInfo);
    }

    @Test
    void givenValidId_whenExistById_thenReturnTrue() {
        UserRepository userRepository = mock(UserRepository.class);
        Mockito.when(userRepository.existsById(1L))
                .thenReturn(true);

        Long id = 1L;
        boolean exist = userRepository.existsById(id);

        assertThat(exist).isTrue();
    }

    @Test
    void givenUser_whenGetById_thenReturnUser() {
        UserRepository userRepository = mock(UserRepository.class);
        Mockito.when(userRepository.getById(1L))
                .thenReturn(this.user);

        UserEntity returnedUser = userRepository.getById(this.user.getId());

        assertThat(returnedUser).isEqualTo(this.user);
    }

    @Test
    void givenUser_whenGetById_thenGetUserInfo() {
        UserRepository userRepository = mock(UserRepository.class);
        Mockito.when(userRepository.getById(1L))
                .thenReturn(this.user);

        UserEntity returnedUser = userRepository.getById(this.user.getId());

        assertThat(returnedUser.getUserInfo()).isEqualTo(this.user.getUserInfo());
    }
}
