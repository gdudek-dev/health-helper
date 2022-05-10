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
    private Long id;

    @Column(name = "age")
    private int age;

    @Column(name = "gender")
    private String gender;

    @Column(name = "height")
    private float height;

    @Column(name = "weight")
    private float weight;

    @OneToOne(mappedBy = "userInfo")
    private UserEntity user;
}
