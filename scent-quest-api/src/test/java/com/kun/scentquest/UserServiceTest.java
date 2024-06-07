package com.kun.scentquest;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.kun.scentquest.common.PageResponse;
import com.kun.scentquest.points.claim.Claim;
import com.kun.scentquest.points.claim.ClaimRepository;
import com.kun.scentquest.points.claim.ClaimResponse;
import com.kun.scentquest.points.coupon.Coupons;
import com.kun.scentquest.points.coupon.CouponsRepository;
import com.kun.scentquest.users.role.User;
import com.kun.scentquest.users.user.UserRepository;

import com.kun.scentquest.users.user.UserRequest;
import com.kun.scentquest.users.user.UserResponse;
import com.kun.scentquest.users.user.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

@SpringBootTest
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ClaimRepository claimRepository;

    @Mock
    private CouponsRepository couponsRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
    }

    @Test
    void testClaimDailyPoints() {
        User user = new User();
        user.setId(1);
        user.setPoints(100);

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(claimRepository.findByUserAndClaimDate(any(User.class), any(LocalDate.class))).thenReturn(Collections.emptyList());

        int claimedPoints = userService.claimDailyPoints(1, LocalDate.now());


        Assertions.assertEquals(claimedPoints, claimedPoints);
        Assertions.assertEquals(user.getPoints(), 100 + claimedPoints);
        verify(claimRepository, times(1)).save(any(Claim.class));
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testIsDailyGiftClaimed() {
        User user = new User();
        user.setId(1);

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(claimRepository.findByUserAndClaimDate(any(User.class), any(LocalDate.class))).thenReturn(Collections.emptyList());

        boolean claimed = userService.isDailyGiftClaimed(1, LocalDate.now());

        Assertions.assertFalse(claimed);
    }

    @Test
    void testGetUserById() {
        User user = new User();
        user.setId(1);
        user.setFirstname("John");
        user.setLastname("Doe");

        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        UserResponse userResponse = userService.getUserById(1);

        Assertions.assertEquals(user.getId(), userResponse.getUserId());
        Assertions.assertEquals(user.getFirstname(), userResponse.getFirstname());
        Assertions.assertEquals(user.getLastname(), userResponse.getLastname());
    }

    @Test
    void testSave() {
        // Arrange
        UserRequest userRequest = new UserRequest();
        userRequest.setFirstname("John");
        userRequest.setLastname("Doe");

        User savedUser = new User();
        savedUser.setId(1);
        savedUser.setFirstname("John");
        savedUser.setLastname("Doe");

        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        Integer savedUserId = userService.save(userRequest);

        Assertions.assertEquals(savedUser.getId(), savedUserId);
    }

    @Test
    void testClaimDailyPoints_GiftClaimed() {
        // Arrange
        User user = new User();
        user.setId(1);

        Claim existingClaim = new Claim();
        existingClaim.setUser(user);
        existingClaim.setType("Daily Gift");

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(claimRepository.findByUserAndClaimDate(any(User.class), any(LocalDate.class))).thenReturn(List.of(existingClaim));

        // Act & Assert
        Assertions.assertThrows(RuntimeException.class, () -> userService.claimDailyPoints(1, LocalDate.now()));
    }

    @Test
    void testFindAllCouponsByUserId() {
        User user = new User();
        user.setId(1);

        List<Coupons> couponsList = Collections.singletonList(new Coupons());

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(couponsRepository.findAllCouponsByUserId(any(PageRequest.class), anyInt())).thenReturn(new PageImpl<>(couponsList));

        PageResponse<Coupons> pageResponse = userService.findAllCouponsByUserId(1, 0, 10);

        Assertions.assertEquals(1, pageResponse.getContent().size());
    }

    @Test
    void testUpdateUserLock() {
        User user = new User();
        user.setId(1);
        user.setAccountLocked(false);

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);

        Integer updatedUserId = userService.updateUserLock(1);

        Assertions.assertEquals(user.getId(), updatedUserId);
        Assertions.assertTrue(user.isAccountLocked());
    }

    @Test
    void testUpdateUserProfileLock() {
        User user = new User();
        user.setId(1);
        user.setPrivateProfile("true");

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);

        Integer updatedUserId = userService.updateUserProfileLock(1);

        Assertions.assertEquals(user.getId(), updatedUserId);
        Assertions.assertEquals("false", user.getPrivateProfile());
    }

    @Test
    void testDelete() {
        int userId = 1;

        userService.delete(userId);

        verify(userRepository, times(1)).deleteById(userId);
    }


}