import {Component, OnInit} from '@angular/core';
import {PageResponseFragranceResponse} from "../../../../services/models/page-response-fragrance-response";
import {Router} from "@angular/router";
import {FragranceService} from "../../../../services/services/fragrance.service";
import {FragranceResponse} from "../../../../services/models/fragrance-response";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenService} from "../../../../services/token/token.service";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-fragrance-list',
  templateUrl: './fragrance-list.component.html',
  styleUrl: './fragrance-list.component.scss'
})
export class FragranceListComponent implements OnInit {
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
    private snackBar: MatSnackBar,
    private tokenService: TokenService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.findAllFragrances();
    this.findAllFavourites();
  }

  isAdmin() {
    return this.tokenService.isAdmin() == true;
  }

  private findAllFragrances() {
    this.fragranceService.findAllFragrances({
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
    if(this.tokenService.isLogged())
      this.router.navigate(['fragrances', 'review', fragrance.fragranceId]);
    else
      this.showSnackbar('You must be logged in to review a fragrance');
  }

  favouriteFragrance(fragrance: FragranceResponse) {
    this.message = '';
    this.level = 'success';
    if (this.tokenService.isLogged()) {
      if (this.favourites.includes(fragrance.fragranceId as number)) {
        this.removeFavourite(fragrance);
        this.showSnackbar('Fragrance removed from favorites')
      } else {
        this.addFavourite(fragrance);
        this.showSnackbar('Fragrance successfully favorited')
      }
    }
    else {
      this.showSnackbar('You must be logged in to favorite a fragrance')
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
        this.findAllFavourites(); // Update favorites list
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


  deleteFragrance(fragrance: FragranceResponse) {
    this.fragranceService.deleteFragrance({
      'fragrance-id': fragrance.fragranceId as number
    }).subscribe({
      next: () => {
        this.findAllFragrances();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openConfirmationDialog(fragrance: FragranceResponse): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: 'Are you sure you want to delete this fragrance?'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog Result:', result); // Check if result is received
      if (result) {
        this.deleteFragrance(fragrance);
      }
    });
  }

  editFragrance(fragrance: FragranceResponse) {
    this.router.navigate(['fragrances', 'manage', fragrance.fragranceId]);
  }
}

