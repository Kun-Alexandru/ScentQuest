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

  get authorities() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token') as string;
    if (token) {
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.authorities;
    }
  }

  isAdmin() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token') as string;
    if (token) {
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.authorities.includes('ROLE_ADMIN');
    }
  }

  isUser() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token') as string;
    if (token) {
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.authorities.includes('ROLE_USER');
    }
  }

  get fullNameJwt() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token') as string;
    if (token) {
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.fullName;
    }
  }

  get email() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token') as string;
    if (token) {
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.sub;
    }
  }

  get userId() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token') as string;
    if (token) {
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.userId;
    }
  }


  isLogged() {
    return !!this.token;
  }

  isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }
    const jwtHelper = new JwtHelperService();
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
