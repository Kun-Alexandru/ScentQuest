import {CanActivateFn, Router} from '@angular/router';
import {TokenService} from '../token/token.service';
import {inject} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  if (tokenService.isTokenNotValid()) {
    snackBar.open("Please log in to access this feature.", 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    return false;
  }
  return true;
};
