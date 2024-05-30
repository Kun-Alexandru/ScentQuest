package com.kun.scentquest.user.user;

import lombok.*;

import java.time.LocalDate;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequest {

    private Integer UserId;
    private String firstname;
    private String lastname;
    private LocalDate dateOfBirth;
    private String email;
    private boolean accountLocked;
    private boolean enabled;

}
