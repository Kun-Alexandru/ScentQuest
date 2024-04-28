import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { RegistrationRequest } from '../../services/models/registration-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerRequest: RegistrationRequest = { email: '', firstname: '', lastname: '', password: '' };
  errorMsg: Array<string> = [];
  successMessage: string = '';

  constructor(private router: Router, private authService: AuthenticationService) {}

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    this.successMessage = ''; // Clear previous success message
    this.authService.register({ body: this.registerRequest }).subscribe({
      next: () => {
        this.successMessage = 'Registration successful. Please check your email to activate your account.';
        this.registerRequest = { email: '', firstname: '', lastname: '', password: '' }; // Clear input fields
      },
      error: (err) => {
        this.errorMsg = err.error.validationErrors;
      },
    });
  }
}
