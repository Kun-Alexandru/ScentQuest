import { Component } from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";
import {ResetPasswordRequest} from "../../services/models/reset-password-request";
import {ResetPasswordDefaultRequest} from "../../services/models/reset-password-default-request";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";

@Component({
  selector: 'app-reset-password-component',
  templateUrl: './reset-password-component.component.html',
  styleUrl: './reset-password-component.component.scss'
})
export class ResetPasswordComponentComponent {

  resetPasswordRequest: ResetPasswordDefaultRequest = { email: '', secretKey : '' };
  errorMsg: Array<string> = [];
  successMessage: string = '';

  constructor(private router: Router, private authService: AuthenticationService) {}

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  resetPassword() {
    this.errorMsg = [];
    this.successMessage = '';
    this.authService.resetPassword1({
      body: this.resetPasswordRequest
    })
      .subscribe({
        next: () => {
          this.successMessage = 'Password reset successful. Please check your email to see your new password.';
          this.resetPasswordRequest = { email: '', secretKey: '' };
        },
        error: (err) => {
          console.log(err);
          if (err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors;
          } else {
            let errorMessage = err.error;
            let errorMessageParts = errorMessage.split(":");
            if (errorMessageParts.length > 1) {
              errorMessage = errorMessageParts.slice(1).join(":").trim();
            }
            this.errorMsg.push(errorMessage);
          }
        }
      });
  }
}
