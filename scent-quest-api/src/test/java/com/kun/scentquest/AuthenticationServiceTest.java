package com.kun.scentquest;

import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Optional;

import com.kun.scentquest.auth.*;
import com.kun.scentquest.email.EmailService;
import com.kun.scentquest.email.EmailTemplateName;
import com.kun.scentquest.users.role.Role;
import com.kun.scentquest.users.role.RoleRepository;
import com.kun.scentquest.security.JwtService;
import com.kun.scentquest.users.token.Token;
import com.kun.scentquest.users.token.TokenRepository;
import com.kun.scentquest.users.role.User;
import com.kun.scentquest.users.user.UserRepository;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
public class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private EmailService emailService;

    @Mock
    private TokenRepository tokenRepository;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        // Setup mocks before each test
    }

    @Test
    void testRegister() throws MessagingException {
        RegistrationRequest request = new RegistrationRequest("John", "Doe", "john.doe@example.com", "password123@Aa", "secret");


        Role userRole = new Role();
        userRole.setName("ROLE_USER");

        when(roleRepository.findByName("ROLE_USER")).thenReturn(Optional.of(userRole));

        authenticationService.register(request);

        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testAuthenticate() {
        String email = "john.doe@example.com";
        String password = "password123";

        User user = new User();
        user.setEmail(email);
        user.setPassword(password);

        AuthenticationRequest request = new AuthenticationRequest("john.doe@example.com", "password123");

        Authentication authentication = new UsernamePasswordAuthenticationToken(user, null);

        HashMap<String, Object> claims = new HashMap<>();
        claims.put("fullName", user.getFullName());
        claims.put("userId", user.getId());

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(jwtService.generateToken(claims, user)).thenReturn("jwt-token");

        AuthenticationResponse response = authenticationService.authenticate(request);

        Assertions.assertNotNull(response.getToken());
        Assertions.assertEquals("jwt-token", response.getToken());
    }

    @Test
    void testRegisterWithInvalidData() {
        RegistrationRequest request = new RegistrationRequest("", "", "invalid-email", "short", "secret");

        try {
            authenticationService.register(request);
        } catch (Exception e) {
            Assertions.assertEquals("ROLE USER was not initiated", e.getMessage());
        }
    }



}