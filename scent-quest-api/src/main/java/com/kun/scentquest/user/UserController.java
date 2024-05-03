package com.kun.scentquest.user;

import com.kun.scentquest.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
@Tag(name = "user", description = "The user API")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<PageResponse<UserResponse>> findAllUsers(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size
    ) {
        return ResponseEntity.ok(userService.findAll(page, size));
    }

    @GetMapping("{user-id}")
    public ResponseEntity<UserResponse> findUserById(
            @RequestParam(name = "user-id") Integer userId
    ) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @DeleteMapping("{user-id}")
    public ResponseEntity<Void> deleteUser(
            @RequestParam(name = "user-id") Integer userId
    ) {
        userService.delete(userId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("{user-id}")
    public ResponseEntity<UserResponse> updateUser(
            @RequestParam(name = "user-id") Integer userId,
            @RequestBody UserRequest request
    ) {
        return ResponseEntity.ok(userService.update(userId, request));
    }

    @PostMapping("{user-id}/lock")
    public ResponseEntity<Void> lockUser(
            @RequestParam(name = "user-id") Integer userId
    ) {
        userService.updateUserLock(userId);
        return ResponseEntity.noContent().build();
    }

}
