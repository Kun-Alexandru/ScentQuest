import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {FragranceService} from "../../../../services/services/fragrance.service";
import {Router} from "@angular/router";
import {TokenService} from "../../../../services/token/token.service";
import {MatDialog} from "@angular/material/dialog";
import {FragranceResponse} from "../../../../services/models/fragrance-response";
import {ReviewFormComponent} from "../review-form/review-form.component";
import {ReviewRequest} from "../../../../services/models/review-request";
import {ResetPasswordFormComponent} from "../reset-password-form/reset-password-form.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  fullName: string | null = localStorage.getItem('fullName');

  constructor(
    private tokenService: TokenService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  public loggedIn() {
    this.showSnackbar('Please log in to access this feature.');
  }

  goProfile() {
    this.router.navigate(['fragrances', 'member', this.tokenService.userId]);
  }

  goFavorites() {
    if (this.tokenService.isLogged()) {
      this.router.navigate(['/my-favorites']);
    } else {
      this.showSnackbar('Please log in to access this feature.');
    }

  }

  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('userId');
    window.location.reload();
  }

  isAdmin() {
    return this.tokenService.isAdmin() == true;
  }

  isLogged() {
    return this.tokenService.isLogged();
  }

  getFullName(): string {
    return this.tokenService.fullNameJwt;
  }

  getEmail(): string {
    return this.tokenService.email;
  }

  reviewFragrance() {
    if(this.tokenService.isLogged()) {
      const dialogRef = this.dialog.open(ResetPasswordFormComponent, {
        width: '400px'
      });
      dialogRef.componentInstance.passwordSubmitted.subscribe((success: boolean) => {
        dialogRef.close();
      });

      dialogRef.afterClosed().subscribe(() => {
      });

      dialogRef.afterOpened().subscribe(() => {
      });

    }
  }
}
