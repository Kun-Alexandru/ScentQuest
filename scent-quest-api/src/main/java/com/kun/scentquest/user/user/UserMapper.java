package com.kun.scentquest.user.user;

import com.kun.scentquest.file.FileUtils;
import com.kun.scentquest.user.user.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {

    public static User toUser(UserRequest userRequest) {
        return User.builder()
                .id(userRequest.getUserId())
                .firstname(userRequest.getFirstname())
                .lastname(userRequest.getLastname())
                .dateOfBirth(userRequest.getDateOfBirth())
                .email(userRequest.getEmail())
                .accountLocked(userRequest.isAccountLocked())
                .enabled(userRequest.isEnabled())
                .build();
    }

    public static UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .UserId(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .dateOfBirth(user.getDateOfBirth())
                .email(user.getEmail())
                .accountLocked(user.isAccountLocked())
                .enabled(user.isEnabled())
                .privateProfile(user.getPrivateProfile())
                .profilePicture(FileUtils.readFileFromLocation(user.getProfilePicture()))
                .backgroundPicture(FileUtils.readFileFromLocation(user.getBackgroundPicture()))
                .points(user.getPoints())
                .build();
    }

}
