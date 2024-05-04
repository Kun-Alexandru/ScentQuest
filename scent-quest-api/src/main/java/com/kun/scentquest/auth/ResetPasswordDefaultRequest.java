package com.kun.scentquest.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResetPasswordDefaultRequest {

    @Email(message = "Email is not formatted correctly")
    @NotEmpty(message = "Email is required")
    @NotBlank(message = "Email is required")
    String email;
    @NotEmpty(message = "Secret key is required")
    @NotBlank(message = "Secret key is required")
    String secretKey;

}
