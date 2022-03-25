package com.gdudek.healthhelperapi.domain.user;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "user_info")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long Id;

    @Column(name = "age")
    private int age;

    @Column(name = "gender")
    private String gender;

    @Column(name = "height")
    private float height;

    @OneToOne(mappedBy = "userInfo")
    private UserEntity user;
}
