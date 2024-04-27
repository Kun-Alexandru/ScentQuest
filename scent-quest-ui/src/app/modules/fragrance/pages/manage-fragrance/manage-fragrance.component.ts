import {Component, OnInit} from '@angular/core';
import {FragranceRequest} from "../../../../services/models/fragrance-request";
import {saveFragrance} from "../../../../services/fn/fragrance/save-fragrance";
import {FragranceService} from "../../../../services/services/fragrance.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-fragrance',
  templateUrl: './manage-fragrance.component.html',
  styleUrl: './manage-fragrance.component.scss'
})
export class ManageFragranceComponent {
  fragranceRequest: FragranceRequest = {
    brand: "",
    discontinued: false,
    name: "",
    recommendedSeason: "",
    releaseDate: "",
    shortDescription: "",
  };
  errorMsg: Array<string> = [];
  selectedFragranceCover: any;
  selectedPicture: string | undefined;
  isFileSelected: boolean = false;

  constructor(
    private fragranceService: FragranceService,
    private router: Router
  ) {}

  onFileSelected(event: Event) {
    this.selectedFragranceCover = (event.target as HTMLInputElement).files?.[0];
    console.log(this.selectedFragranceCover);
    if (this.selectedFragranceCover) {

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFragranceCover);
      this.isFileSelected = true;
    }
  }

  saveFragrance() {

    if (!this.selectedFragranceCover) {
      this.isFileSelected = false;
      return;
    }

    this.fragranceService.saveFragrance({
      body: this.fragranceRequest
    }).subscribe({
      next: (fragranceId) => {
        this.fragranceService.uploadFragrancePicture({
          'fragrance-id': fragranceId,
          body: {
            file: this.selectedFragranceCover
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/fragrances/my-fragrances']);
          }
        });
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = err.error.validationErrors;
      }
    });
  }
}
