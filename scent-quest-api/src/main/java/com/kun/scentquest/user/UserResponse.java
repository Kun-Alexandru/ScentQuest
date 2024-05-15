package com.kun.scentquest.user;

import com.kun.scentquest.fragrance.Favorite.Favourite;
import com.kun.scentquest.fragrance.Fragrance.Fragrance;
import com.kun.scentquest.role.Role;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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


}
