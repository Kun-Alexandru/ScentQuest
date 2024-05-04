import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {UserResponse} from "../../../../services/models/user-response";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FragranceService} from "../../../../services/services/fragrance.service";
import {ReviewService} from "../../../../services/services/review.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../../services/services/user.service";

@Component({
  selector: 'app-update-user-info-form',
  templateUrl: './update-user-info-form.component.html',
  styleUrl: './update-user-info-form.component.scss'
})
export class UpdateUserInfoFormComponent {
  selectedUser: UserResponse = {};
  errorMsg: Array<string> = [];
  emailStart: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fragranceService: FragranceService,
    private reviewService: ReviewService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    console.log(data)
    this.emailStart = data.email;
    this.selectedUser = data;
  }

  @Output() userSubmitted = new EventEmitter<boolean>();

  cancelSubmit() {
    this.userSubmitted.emit(false);
  }

  submitUser() {
    this.updateUser();
  }

  updateUser() {
    if(this.selectedUser.lastname != '' && this.selectedUser.firstname != '') {
      this.userService.updateUser({
        "user-id": this.selectedUser.userId as number,
        body: this.selectedUser
      })
        .subscribe({
          next: (id) => {
            this.showSnackbar('User data updated successfully!')
            this.userSubmitted.emit(true);
          },
          error: (err) => {
            console.log(err);
            if (err.error.validationErrors) {
              this.errorMsg = err.error.validationErrors;
            } else {
              let errorMessage = err.error;
              let errorMessageParts = errorMessage.split(":");
              if (errorMessageParts.length > 1) {
                errorMessage = errorMessageParts.slice(1).join(":").trim();
              }
              this.errorMsg.push(errorMessage);
            }
          }
        });
    } else {
      this.errorMsg.push("First name and last name cannot be empty!");
    }
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  onEmailChange() {
    if (this.selectedUser.email !== this.emailStart) {
      this.selectedUser.enabled = false;
    }
  }
}

