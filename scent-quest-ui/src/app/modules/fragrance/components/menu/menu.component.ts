import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {FragranceService} from "../../../../services/services/fragrance.service";
import {Router} from "@angular/router";
import {TokenService} from "../../../../services/token/token.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  fullName: string | null = localStorage.getItem('fullName');

  constructor(
    private tokenService: TokenService
  ) {
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
}
