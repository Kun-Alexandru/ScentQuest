import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string | null) {
    if (token) {
      const jwtHelper = new JwtHelperService();
      localStorage.setItem('token', token);
      const decodedToken = jwtHelper.decodeToken(token);
      localStorage.setItem('fullName', decodedToken.fullName);
      localStorage.setItem('userId', decodedToken.userId);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('fullName');
      localStorage.removeItem('userId');
    }
  }

  get token() {
    return localStorage.getItem('token') as string;
  }

  isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }
    // decode the token
    const jwtHelper = new JwtHelperService();
    // check expiry date
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }
}