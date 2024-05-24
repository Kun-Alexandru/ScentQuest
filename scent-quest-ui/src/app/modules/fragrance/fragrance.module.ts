import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FragranceRoutingModule } from './fragrance-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { FragranceListComponent } from './pages/fragrance-list/fragrance-list.component';
import { FragranceCardComponent } from './components/fragrance-card/fragrance-card.component';
import { RatingComponent } from './components/rating/rating.component';
import { MyFragrancesComponent } from './pages/my-fragrances/my-fragrances.component';
import { ManageFragranceComponent } from './pages/manage-fragrance/manage-fragrance.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LeaveFeedbackComponent } from './pages/leave-feedback/leave-feedback.component';
import { MyFavoriteListComponent } from './pages/my-favorite-list/my-favorite-list.component';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MultiSelectModule} from "primeng/multiselect";
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule} from "@angular/material/dialog";
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatMenu, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ManageFragranceAdminComponent } from './pages/manage-fragrance-admin/manage-fragrance-admin.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { UpdateUserInfoFormComponent } from './components/update-user-info-form/update-user-info-form.component';
import { FragrancePageComponent } from './pages/fragrance-page/fragrance-page.component';
import { MyOwnedListComponent } from './pages/my-owned-list/my-owned-list.component';
import { UserProfileMemberComponent } from './pages/user-profile-member/user-profile-member.component';
import { ImagePreviewModalComponent } from './components/image-preview-modal-component/image-preview-modal-component.component';
import { ModalForSelectComponent } from './components/modal-for-select/modal-for-select.component';
import { ConfirmationDialogPhotoComponent } from './components/confirmation-dialog-photo/confirmation-dialog-photo.component';
import { FragranceItemComponent } from './components/fragrance-item/fragrance-item.component';
import { LoyaltyPageComponent } from './pages/loyalty-page/loyalty-page.component';
import {MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatTable} from "@angular/material/table";


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    FragranceListComponent,
    FragranceCardComponent,
    RatingComponent,
    MyFragrancesComponent,
    ManageFragranceComponent,
    LeaveFeedbackComponent,
    MyFavoriteListComponent,
    DeleteConfirmationDialogComponent,
    ConfirmationDialogComponent,
    ManageFragranceAdminComponent,
    ReviewFormComponent,
    AdminDashboardComponent,
    ResetPasswordFormComponent,
    UpdateUserInfoFormComponent,
    FragrancePageComponent,
    MyOwnedListComponent,
    UserProfileMemberComponent,
    ImagePreviewModalComponent,
    ModalForSelectComponent,
    ConfirmationDialogPhotoComponent,
    FragranceItemComponent,
    LoyaltyPageComponent
  ],
  imports: [
    CommonModule,
    FragranceRoutingModule,
    FormsModule,
    MatFormField,
    MatOption,
    MatSelect,
    MatLabel,
    MultiSelectModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatButtonModule,
    FragranceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MultiSelectModule,
    MatMenu,
    MatMenuTrigger,
    MatMenuModule,
    MatSnackBarModule,
    MatTable,
    MatRow,
    MatHeaderRow,
    MatCell,
    MatHeaderCell,
    MatColumnDef
  ]
})
export class FragranceModule { }
