import {Component, OnInit} from '@angular/core';
import {PageResponseFragranceResponse} from "../../../../services/models/page-response-fragrance-response";
import {Router} from "@angular/router";
import {FragranceService} from "../../../../services/services/fragrance.service";
import {FragranceResponse} from "../../../../services/models/fragrance-response";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ReactionResponse} from "../../../../services/models/reaction-response";
import {TokenService} from "../../../../services/token/token.service";
import {MatDialog} from "@angular/material/dialog";
import {ReactionService} from "../../../../services/services/reaction.service";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {ReviewFormComponent} from "../../components/review-form/review-form.component";
import {ReviewRequest} from "../../../../services/models/review-request";

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
  season: string = '';
  searchWord = '';
  reactions: ReactionResponse[] = [];

  constructor(
    private fragranceService: FragranceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private tokenService: TokenService,
    private dialog: MatDialog,
    private reactionService: ReactionService
  ) {
  }

  ngOnInit(): void {
    this.findAllFragrances();
    this.findAllFavourites();
    this.findAllReactions();
  }

  private findAllFragrances() {
    this.fragranceService.findAllFavoritedFragrancesByOwner({
      page: this.page,
      size: this.size,
      searchWord: this.searchWord,
      season: this.season
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
    if(this.tokenService.isLogged()) {
      const dialogRef = this.dialog.open(ReviewFormComponent, {
        width: '900px',
        data: fragrance
      });
      dialogRef.componentInstance.reviewSubmitted.subscribe((review: ReviewRequest) => {
        dialogRef.close();
        this.findAllFragrances();
        this.findAllFavourites();
        this.findAllReactions();
      });

      dialogRef.afterClosed().subscribe(() => {
        this.findAllFragrances();
        this.findAllFavourites();
        this.findAllReactions();
      });

      dialogRef.afterOpened().subscribe(() => {
        this.findAllFragrances();
        this.findAllFavourites();
        this.findAllReactions();
      });

    } else
      this.showSnackbar('You must be logged in to review a fragrance');
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

  private findAllReactions() {
    this.reactionService.getReactionsByUserId({
      'userId': this.tokenService.userId as number
    }).subscribe({
      next: (reactions) => {
        this.reactions = reactions;
        console.log("Reactions:", this.reactions);
      }
    });
  }

  isAdmin() {
    return this.tokenService.isAdmin() == true;
  }

  openConfirmationDialog(fragrance: FragranceResponse): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: 'Are you sure you want to delete this fragrance?'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog Result:', result);
      if (result) {
        this.deleteFragrance(fragrance);
      }
    });
  }

  deleteFragrance(fragrance: FragranceResponse) {
    this.fragranceService.deleteFragrance({
      'fragrance-id': fragrance.fragranceId as number
    }).subscribe({
      next: () => {
        this.showSnackbar('Fragrance successfully deleted')
        this.findAllFragrances();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  likeFragrance(fragrance: FragranceResponse) {
    this.message = '';
    this.level = 'success';
    if (this.tokenService.isLogged()) {
      this.likeFragranceAPI(fragrance);
      this.showSnackbar('Fragrance liked')
    }
    else {
      this.showSnackbar('You must be logged in to like a fragrance')
    }
  }

  dislikeFragrance(fragrance: FragranceResponse) {
    this.message = '';
    this.level = 'success';
    if (this.tokenService.isLogged()) {
      this.dislikeFragranceAPI(fragrance);
      this.showSnackbar('Fragrance disliked')
    }
    else {
      this.showSnackbar('You must be logged in to dislike a fragrance')
    }
  }

  private likeFragranceAPI(fragrance: FragranceResponse) {
    this.reactionService.saveReaction( {
      body: {type: 'like', fragranceId: fragrance.fragranceId as number, userId: this.tokenService.userId as number}
    })
      .subscribe({
        next: () => {
          this.findAllFragrances()
          this.findAllReactions();
          this.findAllFavourites();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  private dislikeFragranceAPI(fragrance: FragranceResponse) {
    this.reactionService.saveReaction( {
      body: {type: 'dislike', fragranceId: fragrance.fragranceId as number, userId: this.tokenService.userId as number}
    })       .subscribe({
      next: () => {
        this.findAllFragrances()
        this.findAllReactions();
        this.findAllFavourites();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editFragrance(fragrance: FragranceResponse) {
    this.router.navigate(['fragrances', 'manage', fragrance.fragranceId]);
  }

  onSeasonChange(event: any) {
    this.season = event.target.value;
    this.page = 0;
    this.findAllFragrances();
    this.findAllFavourites();
    this.findAllReactions();
  }

  onInputChange(event: any) {
    this.searchWord = event.target.value;
    this.page = 0;
    this.findAllFragrances();
    this.findAllFavourites();
    this.findAllReactions();
  }

}
