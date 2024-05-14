import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { AuthenticationRequest } from '../../services/models/authentication-request';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['fragrances']);
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

  register() {
    this.router.navigate(['register']);
  }

  togglePasswordVisibility(event: any) {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
      const passwordField = passwordInput as HTMLInputElement;
      passwordField.type = event.target.checked ? 'text' : 'password';
    }
  }

  resetPassword() {
    this.router.navigate(['reset-password']);
  }
}
