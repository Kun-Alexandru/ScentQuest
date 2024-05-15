import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {UserResponse} from "../../../../services/models/user-response";
import {TokenService} from "../../../../services/token/token.service";
import {FragranceResponse} from "../../../../services/models/fragrance-response";
import {ConfirmationDialogComponent} from "../../components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmationDialogPhotoComponent
} from "../../components/confirmation-dialog-photo/confirmation-dialog-photo.component";

@Component({
  selector: 'app-user-profile-member',
  templateUrl: './user-profile-member.component.html',
  styleUrl: './user-profile-member.component.scss'
})
export class UserProfileMemberComponent {

  user: UserResponse = {};
  profilePicture: string | undefined;
  backgroundPicture: string | undefined;
  selectedProfilePicture: string = '';
  selectedBackgroundPicture: any;
  pictureSelected: boolean = false;
  pictureFile: any;
  backgroundSelected: boolean = false;
  backgroundFile: any;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
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


  confirmProfilePicture() {
  }
}
