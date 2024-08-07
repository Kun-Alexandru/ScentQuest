package com.kun.scentquest.users.user;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

    private Integer UserId;
    private String firstname;
    private String lastname;
    private LocalDate dateOfBirth;
    private String email;
    private boolean accountLocked;
    private boolean enabled;
    private String privateProfile;
    private byte[] profilePicture;
    private byte[] backgroundPicture;
    private int points;
    private String description;


}
