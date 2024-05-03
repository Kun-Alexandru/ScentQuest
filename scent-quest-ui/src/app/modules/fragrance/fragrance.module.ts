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
    ReviewFormComponent
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
    MatSnackBarModule
  ]
})
export class FragranceModule { }
