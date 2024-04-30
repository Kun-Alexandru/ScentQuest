import {Component, OnInit} from '@angular/core';
import {PageResponseFragranceResponse} from "../../../../services/models/page-response-fragrance-response";
import {FragranceService} from "../../../../services/services/fragrance.service";
import {Router} from "@angular/router";
import {FragranceResponse} from "../../../../services/models/fragrance-response";
import {TokenService} from "../../../../services/token/token.service";

@Component({
  selector: 'app-my-fragrances',
  templateUrl: './my-fragrances.component.html',
  styleUrl: './my-fragrances.component.scss'
})
export class MyFragrancesComponent implements OnInit {
  fragranceResponse: PageResponseFragranceResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  favourites: Number[] = [];

  constructor(
    private fragranceService: FragranceService,
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
    this.findAllFragrances();
    this.findAllFavourites();
  }

  private findAllFragrances() {
    this.fragranceService.findAllFragrancesByOwner({
      page: this.page,
      size: this.size
    })
      .subscribe({
        next: (fragrances) => {
          this.fragranceResponse = fragrances;
          this.pages = Array(this.fragranceResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        }
      });
  }

  private findAllFavourites() {
    this.fragranceService.findAllFavouritesByUserId().subscribe({
      next: (favourites) => {
        this.favourites = favourites;
        console.log("Favorites:", this.favourites);
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllFragrances();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllFragrances();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllFragrances();
  }

  goToLastPage() {
    this.page = this.fragranceResponse.totalPages as number - 1;
    this.findAllFragrances();
  }

  goToNextPage() {
    this.page++;
    this.findAllFragrances();
  }

  get isLastPage() {
    return this.page === this.fragranceResponse.totalPages as number - 1;
  }

  displayFragranceDetails(fragrance: FragranceResponse) {
    this.router.navigate(['fragrances', 'details', fragrance.fragranceId]);
  }

  deleteFragrance(fragrance: FragranceResponse) {

  }

  editFragrance(fragrance: FragranceResponse) {
    this.router.navigate(['fragrances', 'manage', fragrance.fragranceId]);
  }

  isAdmin() {
    console.log(this.tokenService.isAdmin());
    return this.tokenService.isAdmin() == true;
  }
}
