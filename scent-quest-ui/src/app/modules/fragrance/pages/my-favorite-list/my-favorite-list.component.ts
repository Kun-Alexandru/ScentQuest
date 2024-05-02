import {Component, OnInit} from '@angular/core';
import {PageResponseFragranceResponse} from "../../../../services/models/page-response-fragrance-response";
import {Router} from "@angular/router";
import {FragranceService} from "../../../../services/services/fragrance.service";
import {FragranceResponse} from "../../../../services/models/fragrance-response";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-my-favorite-list',
  templateUrl: './my-favorite-list.component.html',
  styleUrl: './my-favorite-list.component.scss'
})
export class MyFavoriteListComponent implements OnInit {

  fragranceResponse: PageResponseFragranceResponse = {};
  page = 0;
  size = 6;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';
  favourites: Number[] = [];

  constructor(
    private fragranceService: FragranceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.findAllFragrances();
    this.findAllFavourites();
  }

  private findAllFragrances() {
    this.fragranceService.findAllFavoritedFragrancesByOwner({
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

  reviewFragrance(fragrance: FragranceResponse) {
    this.router.navigate(['fragrances', 'review', fragrance.fragranceId]);
  }

  favouriteFragrance(fragrance: FragranceResponse) {
    this.message = '';
    this.level = 'success';
    if (this.favourites.includes(fragrance.fragranceId as number)) {
      this.removeFavourite(fragrance);
      this.showSnackbar('Fragrance successfully removed from favorites')
    } else {
      this.addFavourite(fragrance);
      this.showSnackbar('Fragrance successfully added to favorites')
    }
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  private addFavourite(fragrance: FragranceResponse) {
    this.fragranceService.saveFavourite({
      'fragrance-id': fragrance.fragranceId as number
    }).subscribe({
      next: () => {
        //this.level = 'success';
        //this.message = 'Fragrance successfully favorited';
        this.findAllFavourites();
        this.findAllFragrances();
      },
      error: (err) => {
        console.log(err);
        //this.level = 'error';
        //this.message = err.error.error;
      }
    });
  }

  private removeFavourite(fragrance: FragranceResponse) {
    this.fragranceService.deleteFavourite({
      'fragrance-id': fragrance.fragranceId as number
    }).subscribe({
      next: () => {
        //this.level = 'success';
        //this.message = 'Fragrance removed from favourites';
        this.findAllFavourites();
        this.findAllFragrances();
      },
      error: (err) => {
        console.log(err);
        //this.level = 'error';
        //this.message = err.error.error;
      }
    });
  }

  closeMessage() {
    this.message = '';
  }

}
