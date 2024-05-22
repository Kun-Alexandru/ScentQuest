import {Component, OnInit} from '@angular/core';
import {PageResponseFragranceResponse} from "../../../../services/models/page-response-fragrance-response";
import {Router} from "@angular/router";
import {FragranceService} from "../../../../services/services/fragrance.service";
import {FragranceResponse} from "../../../../services/models/fragrance-response";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenService} from "../../../../services/token/token.service";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ReviewFormComponent} from "../../components/review-form/review-form.component";
import {ReviewRequest} from "../../../../services/models/review-request";
import {ReactionResponse} from "../../../../services/models/reaction-response";
import {ReactionService} from "../../../../services/services/reaction.service";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UserService} from "../../../../services/services/user.service";

@Component({
  selector: 'app-fragrance-list',
  templateUrl: './fragrance-list.component.html',
  styleUrl: './fragrance-list.component.scss',
  animations: [
    trigger('pointsChanged', [
      transition(':increment', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('buttonHover', [
      state('hovered', style({
        transform: 'scale(1.1)'
      })),
      state('unhovered', style({
        transform: 'scale(1)'
      })),
      transition('hovered <=> unhovered', animate('200ms ease-out'))
    ])
  ]
})
export class FragranceListComponent implements OnInit {
  fragranceResponse: PageResponseFragranceResponse = {};
  page = 0;
  size = 6;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';
  favourites: Number[] = [];
  owned: Number[] = [];
  season: string = '';
  searchWord = '';
  reactions: ReactionResponse[] = [];
  isDailyClaimed: boolean = true;
  earnedPoints: number = 0;

  constructor(
    private fragranceService: FragranceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private tokenService: TokenService,
    private dialog: MatDialog,
    private reactionService: ReactionService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    if(this.tokenService.isLogged()) {
      this.isDailyGiftClaimed();
    }
    this.findAllFragrances();
    this.findAllFavourites();
    this.findAllOwned();
    this.findAllReactions();

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js';
    script.async = true;
    document.head.appendChild(script);

  }

  isLogged() {
    return this.tokenService.isLogged();
  }

  getCurrentDate(): string {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  private isDailyGiftClaimed() {
    return this.userService.isDailyGiftClaimed({
      'user-id': this.tokenService.userId as number,
      'date': this.getCurrentDate()
    }).subscribe({
      next: (response) => {
        this.isDailyClaimed = response;
      }
    });
  }

  claimDaily() {
    this.isDailyClaimed = true;
    this.userService.claimPoints({
      'user-id': this.tokenService.userId as number,
      body: this.getCurrentDate()
    }).subscribe({
      next: (points) => {
        this.isDailyClaimed = true;
        this.isDailyGiftClaimed();
        this.earnedPoints = points;
        const modalElement = document.getElementById('dailyGiftModal');
        if (modalElement) {
          const modal = new (window as any).bootstrap.Modal(modalElement);
          modal.show();
        }
      },
      error: (err) => {
        console.error('Error claiming daily points:', err);
      }
    });
  }

  isAdmin() {
    return this.tokenService.isAdmin() == true;
  }

  private findAllFragrances() {
    this.fragranceService.findAllFragrances({
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
      }
    });
  }

  private findAllOwned() {
    this.fragranceService.findAllOwnedByUserId().subscribe({
      next: (owned) => {
        this.owned = owned;
      }
    });
  }

  private findAllReactions() {
    this.reactionService.getReactionsByUserId({
      'userId': this.tokenService.userId as number
    }).subscribe({
      next: (reactions) => {
        this.reactions = reactions;
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
        this.findAllOwned();
        this.findAllReactions();
      });

      dialogRef.afterClosed().subscribe(() => {
        this.findAllFragrances();
        this.findAllFavourites();
        this.findAllOwned();
        this.findAllReactions();
      });

      dialogRef.afterOpened().subscribe(() => {
        this.findAllFragrances();
        this.findAllFavourites();
        this.findAllOwned();
        this.findAllReactions();
      });

    } else
      this.showSnackbar('You must be logged in to review a fragrance');
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

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
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

  ownFragrance(fragrance: FragranceResponse) {
    this.message = '';
    this.level = 'success';
    if (this.tokenService.isLogged()) {
      if (this.owned.includes(fragrance.fragranceId as number)) {
        this.removeOwned(fragrance);
        this.showSnackbar('Fragrance successfully removed from owned list')
      } else {
        this.addOwned(fragrance);
        this.showSnackbar('Fragrance successfully added to owned list')
      }
    }
    else {
      this.showSnackbar('You must be logged in to own a fragrance')
    }
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

  private addOwned(fragrance: FragranceResponse) {
    this.fragranceService.saveOwned({
      'fragrance-id': fragrance.fragranceId as number
    }).subscribe({
      next: () => {
        //this.level = 'success';
        //this.message = 'Fragrance successfully favorited';
        this.findAllOwned(); // Update favorites list
      },
      error: (err) => {
        console.log(err);
        //this.level = 'error';
        //this.message = err.error.error;
      }
    });
  }


  private likeFragranceAPI(fragrance: FragranceResponse) {
    this.reactionService.saveReaction( {
      body: {type: 'like', fragranceId: fragrance.fragranceId as number, userId: this.tokenService.userId as number}
    })
      .subscribe({
        next: () => {
          this.findAllFragrances()
          this.findAllReactions();
          this.findAllOwned();
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
        this.findAllOwned();
        this.findAllFavourites();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private removeFavourite(fragrance: FragranceResponse) {
    this.fragranceService.deleteFavourite({
      'fragrance-id': fragrance.fragranceId as number
    }).subscribe({
      next: () => {
        this.findAllFavourites();
      },
      error: (err) => {
        console.log(err);
        //this.level = 'error';
        //this.message = err.error.error;
      }
    });
  }

  private removeOwned(fragrance: FragranceResponse) {
    this.fragranceService.deleteOwned({
      'fragrance-id': fragrance.fragranceId as number
    }).subscribe({
      next: () => {
        this.findAllOwned();
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
        this.showSnackbar('Fragrance successfully deleted')
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
      if (result) {
        this.deleteFragrance(fragrance);
      }
    });
  }

  editFragrance(fragrance: FragranceResponse) {
    this.router.navigate(['fragrances', 'manage', fragrance.fragranceId]);
  }

  redirectToPage(fragrance: FragranceResponse) {
    this.router.navigate(['fragrances','page', fragrance.fragranceId]);
  }


  onSeasonChange(event: any) {
    this.season = event.target.value;
    this.page = 0;
    this.findAllFragrances();
    this.findAllFavourites();
    this.findAllOwned();
    this.findAllReactions();
  }

  onInputChange(event: any) {
    this.searchWord = event.target.value;
    this.page = 0;
    this.findAllFragrances();
    this.findAllFavourites();
    this.findAllOwned();
    this.findAllReactions();
  }
}

