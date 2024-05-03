package com.kun.scentquest.user;

import com.kun.scentquest.common.PageResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final  UserMapper userMapper;

    public UserResponse getUserById(Integer userId) {
        User u = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID::" + userId));
        return UserMapper.toUserResponse(u);
    }

    public PageResponse<UserResponse> findAll(int page, int size,String filter, String searchword) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("firstname").ascending());
        Page<User> users;

        if(filter.equals("true")) {
            users = userRepository.findAllUsersBySearchWordAndAccountLock(searchword,true, pageable);
        } else if(filter.equals("false")) {
            users = userRepository.findAllUsersBySearchWordAndAccountLock(searchword,false, pageable);
        } else
            users = userRepository.findAllUsersBySearchWord(searchword, pageable);
        List<UserResponse> usersResponse = users.stream()
                .map(UserMapper::toUserResponse)
                .toList();

        return new PageResponse<>(
                usersResponse,
                users.getNumber(),
                users.getSize(),
                users.getTotalElements(),
                users.getTotalPages(),
                users.isFirst(),
                users.isLast());
    }

    public Integer save(UserRequest request) {
        User user = UserMapper.toUser(request);
        return userRepository.save(user).getId();
    }

    public void delete(Integer userId) {
        userRepository.deleteById(userId);
    }

    public UserResponse update(Integer userId, UserRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID::" + userId));
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setEmail(request.getEmail());
        user.setAccountLocked(request.isAccountLocked());
        user.setEnabled(request.isEnabled());

        return UserMapper.toUserResponse(userRepository.save(user));
    }

    public Integer updateUserLock(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID::" + userId));
        user.setAccountLocked(!user.isAccountLocked());
        return userRepository.save(user).getId();
    }

}
