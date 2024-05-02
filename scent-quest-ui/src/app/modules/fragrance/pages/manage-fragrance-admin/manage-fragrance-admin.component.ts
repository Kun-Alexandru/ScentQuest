import {Component, OnInit} from '@angular/core';
import {PageResponseFragranceResponse} from "../../../../services/models/page-response-fragrance-response";
import {FragranceService} from "../../../../services/services/fragrance.service";
import {Router} from "@angular/router";
import {TokenService} from "../../../../services/token/token.service";
import {MatDialog} from "@angular/material/dialog";
import {FragranceResponse} from "../../../../services/models/fragrance-response";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-manage-fragrance-admin',
  templateUrl: './manage-fragrance-admin.component.html',
  styleUrl: './manage-fragrance-admin.component.scss'
})
export class ManageFragranceAdminComponent implements OnInit {

  fragranceResponse: PageResponseFragranceResponse = {};
  page = 0;
  size = 6;
  pages: any = [];
  favourites: Number[] = [];

  constructor(
    private fragranceService: FragranceService,
    private router: Router,
    private tokenService: TokenService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.findAllFragrances();
    this.findAllFavourites();
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

  isAdmin() {
    console.log(this.tokenService.isAdmin());
    return this.tokenService.isAdmin() == true;
  }

}
