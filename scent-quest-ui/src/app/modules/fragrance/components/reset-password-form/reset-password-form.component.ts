import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {ResetPasswordRequest} from "../../../../services/models/reset-password-request";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FragranceService} from "../../../../services/services/fragrance.service";
import {ReviewService} from "../../../../services/services/review.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "../../../../services/services/authentication.service";
import {TokenService} from "../../../../services/token/token.service";
import {Console} from "inspector";

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrl: './reset-password-form.component.scss'
})
export class ResetPasswordFormComponent {
  resetPassword: ResetPasswordRequest = {email: '', password: '', newPassword: ''};
  newPassConfirm: string = '';
  email: string = '';
  errorMsg: Array<string> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fragranceService: FragranceService,
    private reviewService: ReviewService,
    private tokenService: TokenService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.email = this.tokenService.email;
  }

  @Output() passwordSubmitted = new EventEmitter<boolean>();

  submitPassword() {
    this.requestPasswordReset();
  }

  cancelPasswordRequest() {
    this.passwordSubmitted.emit(false);
  }

  requestPasswordReset() {
    this.errorMsg = [];
    this.resetPassword.email = this.email;
    if(this.resetPassword.newPassword == this.newPassConfirm) {
      this.authService.resetPassword$Response({
        body: this.resetPassword
      }).subscribe({
        next: (id) => {
          this.showSnackbar('Password reset successful!')
          this.passwordSubmitted.emit(true);
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
    } else {
      console.log(this.newPassConfirm + ' ' + this.resetPassword.newPassword)
      this.errorMsg.push('New passwords do not match');
    }
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }


}
