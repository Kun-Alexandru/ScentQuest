import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {TokenService} from "../token/token.service"; // Import your authentication service

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    if (!this.tokenService.isAdmin()) { // Implement isAdmin method in your AuthService
      this.router.navigate(['/access-denied']); // Redirect to access denied page if not admin
      return false;
    }
    return true;
  }
}
