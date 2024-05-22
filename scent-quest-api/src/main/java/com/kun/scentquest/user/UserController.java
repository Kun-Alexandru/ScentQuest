package com.kun.scentquest.user;

import com.kun.scentquest.common.PageResponse;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
@Tag(name = "user", description = "The user API")
public class UserController {

    private final UserService userService;
    private final SitesService sitesService;
    private final CouponsService couponsService;

    @GetMapping
    public ResponseEntity<PageResponse<UserResponse>> findAllUsers(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @RequestParam(name = "filter", defaultValue = "", required = false) String filter,
            @RequestParam(name = "searchWord", defaultValue = "", required = false) String searchWord
    ) {
        return ResponseEntity.ok(userService.findAll(page, size, filter, searchWord));
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

    @PostMapping("{user-id}/private")
    public ResponseEntity<Void> updatePrivacy(
            @RequestParam(name = "user-id") Integer userId
    ) {
        userService.updateUserProfileLock(userId);
        return ResponseEntity.noContent().build();
    }

   @PostMapping(value = "/profile/", consumes = "multipart/form-data")
   public ResponseEntity<?> uploadProfilePicture(
           @Parameter()
           @RequestPart("file") MultipartFile file,
           Authentication connectedUser
   ) {
       userService.uploadProfilePicture(file, connectedUser, 1);
       return ResponseEntity.accepted().build();
   }

    @PostMapping(value = "/profile/admin/{user-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadProfilePictureAdmin(
            @Parameter()
            @RequestPart("file") MultipartFile file,
            @RequestParam(name = "user-id") Integer userId
    ) {
        userService.uploadProfilePictureAdmin(file, userId);
        return ResponseEntity.accepted().build();
    }

    @PostMapping(value = "/background/", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadBackgroundPicture(
            @Parameter()
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser
    ) {
        userService.uploadBackgroundPicture(file, connectedUser, 1);
        return ResponseEntity.accepted().build();
    }

    @PostMapping(value = "/background/admin/{user-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadBackgroundPictureAdmin(
            @Parameter()
            @RequestPart("file") MultipartFile file,
            @RequestParam(name = "user-id") Integer userId
    ) {
        userService.uploadBackgroundPictureAdmin(file, userId);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/claim-points/{user-id}")
    public ResponseEntity<Integer> claimPoints(
            @RequestParam(name = "user-id") Integer userId
            ,@RequestBody String date
    ) {
        LocalDate dateOfClaim= LocalDate.parse(date);
        return ResponseEntity.ok(userService.claimDailyPoints(userId, dateOfClaim));
    }

    @GetMapping("/claim-points/{user-id}/user")
    public ResponseEntity<PageResponse<ClaimResponse>> getAllClaimsByUserId(
            @RequestParam(name = "user-id") Integer userId,
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size
    ) {
        return ResponseEntity.ok(userService.findAllClaimsByUserId(userId, page, size));
    }

    @GetMapping("/claim-gift/{user-id}/today")
    public ResponseEntity<Boolean> isDailyGiftClaimed(
            @RequestParam(name = "user-id") Integer userId,
            @RequestParam(name = "date") String date
    ) {
        LocalDate dateOfClaim= LocalDate.parse(date);
        return ResponseEntity.ok(userService.isDailyGiftClaimed(userId, dateOfClaim));
    }

    @GetMapping("/sites")
    public ResponseEntity<PageResponse<Sites>> getAllSitesPaged(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size
    ) {
        return ResponseEntity.ok(sitesService.findAllPaged(page, size));
    }

    @PostMapping("/sites/{site-id}/coupons/{user-id}")
    public ResponseEntity<String> generateCoupon(
            @RequestParam(name = "site-id") Integer siteId,
            @RequestParam(name = "user-id") Integer userId
    ) throws MessagingException {
        return ResponseEntity.ok(couponsService.generateCoupon(siteId, userId));
    }
}
