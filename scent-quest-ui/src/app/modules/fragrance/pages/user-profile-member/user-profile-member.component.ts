import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserResponse} from "../../../../services/models/user-response";
import {TokenService} from "../../../../services/token/token.service";
import {FragranceResponse} from "../../../../services/models/fragrance-response";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmationDialogPhotoComponent
} from "../../components/confirmation-dialog-photo/confirmation-dialog-photo.component";
import {FragranceService} from "../../../../services/services/fragrance.service";
import {PageResponseFragranceResponse} from "../../../../services/models/page-response-fragrance-response";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ReviewService} from "../../../../services/services/review.service";
import {PageResponseReviewResponsePicture} from "../../../../services/models/page-response-review-response-picture";

@Component({
  selector: 'app-user-profile-member',
  templateUrl: './user-profile-member.component.html',
  styleUrl: './user-profile-member.component.scss'
})
export class UserProfileMemberComponent {

  user: UserResponse = {};
  favoriteFragrances: PageResponseFragranceResponse = {};
  ownedFragrances: PageResponseFragranceResponse = {};
  reviewsFragrances: PageResponseReviewResponsePicture = {};
  profilePicture: string | undefined;
  backgroundPicture: string | undefined;
  selectedProfilePicture: string = '';
  selectedBackgroundPicture: any;
  pictureSelected: boolean = false;
  pictureFile: any;
  backgroundSelected: boolean = false;
  backgroundFile: any;
  pageOwned = 0;
  favourites: Number[] = [];
  pagesOwned: any = [];
  sizeOwned = 4;
  message = '';
  showOwnedFragrances: boolean = false;
  showFavoriteFragrances: boolean = false;
  showReviews: boolean = false;
  level: 'success' |'error' = 'success';
  pageFavorites = 0;
  sizeFavorites = 4;
  pagesFavorites: any = [];

  pageReviews = 0;
  sizeReviews = 4;
  pagesReviews: any = [];
  reviews: Number[] = [];
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private dialog: MatDialog,
    private fragranceSerivce: FragranceService,
    private snackBar: MatSnackBar,
    private reviewsService: ReviewService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getFavorites();
    this.getReviews();
    this.getOwnedCollection();
  }

  getUserProfile() {
    const userId = this.activatedRoute.snapshot.params['id'];
    if(userId) {
      this.userService.findUserById({
        'user-id': userId as number
      })
        .subscribe({
          next: (user) => {
            this.user = user;
            if(user.profilePicture)
              this.profilePicture = 'data:image/jpg;base64,' + user.profilePicture;

            if(user.backgroundPicture)
              this.backgroundPicture = 'data:image/jpg;base64,' + user.backgroundPicture;
          },
          error: (error) => {
            console.log(error);
          }
        })
    }
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  getReviews() {
    const userId = this.activatedRoute.snapshot.params['id'];
    if(userId) {
      this.reviewsService.findAllReviewsByUserId({
        'userId': userId as number,
        'page': this.pageReviews,
        'size': this.sizeReviews
      })
        .subscribe({
          next: (reviews) => {
            this.reviewsFragrances = reviews;
            this.pagesReviews = Array(this.reviewsFragrances.totalPages)
              .fill(0)
              .map((x, i) => i);
          },
          error: (error) => {
            console.log(error);
          }

        })
    }
  }

  getFavorites() {
    const userId = this.activatedRoute.snapshot.params['id'];
    if(userId) {
      this.fragranceSerivce.findAllFavoritedFragrancesByUser({
        'user-id': userId as number,
        'page': this.pageFavorites,
        'size': this.sizeFavorites
      })
        .subscribe({
          next: (fragrances) => {
            this.favoriteFragrances = fragrances;
            this.pagesFavorites = Array(this.favoriteFragrances.totalPages)
              .fill(0)
              .map((x, i) => i);
          },
          error: (error) => {
            console.log(error);
          }

      })
    }
  }

  getOwnedCollection() {
    const userId = this.activatedRoute.snapshot.params['id'];
    if(userId) {
      this.fragranceSerivce.findAllOwnedFragrancesByUser({
        'user-id': userId as number,
        'page': this.pageOwned,
        'size': this.sizeOwned
      })
        .subscribe({
          next: (fragrances) => {
            this.ownedFragrances = fragrances;
            this.pagesOwned = Array(this.ownedFragrances.totalPages)
              .fill(0)
              .map((x, i) => i);
          },
          error: (error) => {
            console.log(error);
          }

      })
    }
  }

  getVisiblePages(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 0);
    let end = Math.min(start + maxVisiblePages, totalPages);

    if (end - start < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages, 0);
    }

    return Array.from({ length: end - start }, (_, i) => start + i);
  }

  isOwner(): boolean {
    const profileUserId = this.activatedRoute.snapshot.params['id'];
    const loggedUserId = this.tokenService.userId;
    return profileUserId == loggedUserId;
  }

  onProfilePictureChange(event: any) {
    const filee = (event.target as HTMLInputElement).files?.[0];
    if (filee) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedProfilePicture = reader.result as string;
        this.pictureSelected = true;
        this.openConfirmationDialog();
      };
      reader.readAsDataURL(filee);
      this.pictureFile = filee;
    }
  }

  toggleVisibility(): void {
    let privateAcc = this.user.privateProfile;
    if(privateAcc == "false") {
      this.user.privateProfile = "true";
    } else {
      this.user.privateProfile = "false";
    }
    this.userService.updatePrivacy({
      'user-id': this.user.userId as number
    }) .subscribe({
      next: () => {
        this.getUserProfile();
      }
    });
  }

  onBackgroundPictureChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedBackgroundPicture = reader.result as string;
        this.backgroundSelected = true;
        this.openConfirmationDialogBackground();
      };
      reader.readAsDataURL(file);
      this.backgroundFile = file;
    }
  }

  openConfirmationDialogBackground(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogPhotoComponent, {
      width: '600px',
      data: {
        photo: this.selectedBackgroundPicture,
        message: 'Are you sure you want to save this background picture?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = this.activatedRoute.snapshot.params['id'];
        this.userService.uploadBackgroundPictureAdmin({
          'user-id': userId,
          body: {
            file: this.backgroundFile
          }
        }) .subscribe({
          next: () => {
            this.getUserProfile();
          }
        });

      }
    });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogPhotoComponent, {
      width: '600px',
      data: {
        photo: this.selectedProfilePicture,
        message: 'Are you sure you want to save this profile picture?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = this.activatedRoute.snapshot.params['id'];
        this.userService.uploadProfilePictureAdmin({
          'user-id': userId,
          body: {
            file: this.pictureFile
          }
        }) .subscribe({
          next: () => {
            this.getUserProfile();
          }
        });

      }
    });
  }

  gotToPageOwned(page: number) {
    this.pageOwned = page;
    this.getOwnedCollection();
  }

  goToFirstPageOwned() {
    this.pageOwned = 0;
    this.getOwnedCollection();
  }

  goToPreviousPageOwned() {
    this.pageOwned --;
    this.getOwnedCollection();
  }

  goToLastPageOwned() {
    this.pageOwned = this.ownedFragrances.totalPages as number - 1;
    this.getOwnedCollection();
  }

  goToNextPageOwned() {
    this.pageOwned++;
    this.getOwnedCollection();
  }

  get isLastPageOwned() {
    return this.pageOwned === this.ownedFragrances.totalPages as number - 1;
  }



  gotToPageFavorite(page: number) {
    this.pageFavorites = page;
    this.getFavorites();
  }

  goToFirstPageFavorite() {
    this.pageFavorites = 0;
    this.getFavorites();
  }

  goToPreviousPageFavorite() {
    this.pageFavorites --;
    this.getFavorites();
  }

  goToLastPageFavorite() {
    this.pageFavorites = this.favoriteFragrances.totalPages as number - 1;
    this.getFavorites();
  }

  goToNextPageFavorite() {
    this.pageFavorites++;
    this.getFavorites();
  }

  get isLastPageFavorite() {
    return this.pageFavorites === this.favoriteFragrances.totalPages as number - 1;
  }



  gotToPageReview(page: number) {
    this.pageReviews = page;
    this.getReviews();
  }

  goToFirstPageReview() {
    this.pageReviews = 0;
    this.getReviews();
  }

  goToPreviousPageReview() {
    this.pageReviews --;
    this.getReviews();
  }

  goToLastPageReview() {
    this.pageReviews = this.reviewsFragrances.totalPages as number - 1;
    this.getReviews();
  }

  goToNextPageReview() {
    this.pageReviews++;
    this.getReviews();
  }

  get isLastPageReview() {
    return this.pageReviews === this.reviewsFragrances.totalPages as number - 1;
  }
}
