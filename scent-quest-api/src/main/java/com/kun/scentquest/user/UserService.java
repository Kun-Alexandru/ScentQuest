package com.kun.scentquest.user;

import com.kun.scentquest.common.PageResponse;
import com.kun.scentquest.file.FileStorageBackgroundPicService;
import com.kun.scentquest.file.FileStorageProfilePicService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final FileStorageProfilePicService fileStorageProfilePicService;
    private final FileStorageBackgroundPicService fileStorageBackgroundPicService;
    private final  UserMapper userMapper;
    private final ClaimRepository claimRepository;
    private final CouponsRepository counponsRepository;

    public int claimDailyPoints(int userId, LocalDate claimDate) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID::" + userId));

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        List<Claim> existingClaims = claimRepository.findByUserAndClaimDate(user, claimDate);
        List<Claim> giftClaims = existingClaims.stream()
                .filter(claim -> "Daily Gift".equals(claim.getType()))
                .toList();

        //generate random number from 5 to 10
        int randomPoints = (int) (Math.random() * 6) + 5;

        if (giftClaims.isEmpty()) {
            user.setPoints(user.getPoints() + randomPoints);
            Claim claim = Claim.builder()
                    .user(user)
                    .claimDate(claimDate)
                    .type("Daily Gift")
                    .points(randomPoints)
                    .build();
            claimRepository.save(claim);
            userRepository.save(user);
            return randomPoints;
        } else {
            throw new RuntimeException("Daily gift claimed for today");
        }
    }

    public boolean isDailyGiftClaimed(int userId, LocalDate claimDate) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID::" + userId));

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        List<Claim> existingClaims = claimRepository.findByUserAndClaimDate(user, claimDate);

        List<Claim> giftClaims = existingClaims.stream()
                .filter(claim -> "Daily Gift".equals(claim.getType()))
                .toList();

        return !giftClaims.isEmpty();
    }

    public PageResponse<ClaimResponse> findAllClaimsByUserId(int userId, int page, int size) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID::" + userId));
        Pageable pageable = PageRequest.of(page, size,Sort.by("claimDate").descending());
        Page<Claim> claims = claimRepository.findAllClaimsByUserId(pageable, userId);
        List<ClaimResponse> claimsResponse = claims.stream()
                .map(ClaimMapper::toClaimResponse)
                .toList();
        return new PageResponse<>(
                claimsResponse,
                claims.getNumber(),
                claims.getSize(),
                claims.getTotalElements(),
                claims.getTotalPages(),
                claims.isFirst(),
                claims.isLast());
    }

    public PageResponse<Coupons> findAllCouponsByUserId(int userId, int page, int size) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID::" + userId));
        Pageable pageable = PageRequest.of(page, size,Sort.by("createdAt").descending());
        Page<Coupons> coupons = counponsRepository.findAllCouponsByUserId(pageable, userId);
        List<Coupons> couponsResponse = coupons.stream()
                .toList();
        return new PageResponse<>(
                couponsResponse,
                coupons.getNumber(),
                coupons.getSize(),
                coupons.getTotalElements(),
                coupons.getTotalPages(),
                coupons.isFirst(),
                coupons.isLast());
    }

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

    public void uploadProfilePicture(MultipartFile file, Authentication connectedUser, Integer fragranceId) {
        Integer userId = ((User) connectedUser.getPrincipal()).getId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID::" + userId));
        var profilePicture = fileStorageProfilePicService.saveFile(file, fragranceId, userId);
        user.setProfilePicture(profilePicture);
        userRepository.save(user);
    }

    public void uploadProfilePictureAdmin(MultipartFile file, Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID::" + userId));
        var profilePicture = fileStorageProfilePicService.saveFile(file, 1, userId);
        user.setProfilePicture(profilePicture);
        userRepository.save(user);
    }

    public void uploadBackgroundPicture(MultipartFile file, Authentication connectedUser, Integer fragranceId) {
        Integer userId = ((User) connectedUser.getPrincipal()).getId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID::" + userId));
        var backgroundPicture = fileStorageBackgroundPicService.saveFile(file, fragranceId, userId);
        user.setBackgroundPicture(backgroundPicture);
        userRepository.save(user);
    }

    public void uploadBackgroundPictureAdmin(MultipartFile file, Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID::" + userId));
        var backgroundPicture = fileStorageBackgroundPicService.saveFile(file, 1, userId);
        user.setBackgroundPicture(backgroundPicture);
        userRepository.save(user);
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

    public Integer updateUserProfileLock(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID::" + userId));
        if(user.getPrivateProfile().equals("true")) {
            user.setPrivateProfile("false");
        } else {
            user.setPrivateProfile("true");
        }
        return userRepository.save(user).getId();
    }

}
