import { Component, OnInit } from '@angular/core';
import { FragranceRequest } from '../../../../services/models/fragrance-request';
import { FragranceService } from '../../../../services/services/fragrance.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-manage-fragrance',
  templateUrl: './manage-fragrance.component.html',
  styleUrls: ['./manage-fragrance.component.scss']
})
export class ManageFragranceComponent implements OnInit {
  selectedToppings = new FormControl(['Extra cheese','Onion']);
  toppings: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  cities: City[] = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
  ];

  selectedCityCodes: string[] = ['Paris','Rome'];

  fragranceRequest: FragranceRequest = {
    brand: '',
    discontinued: false,
    name: '',
    recommendedSeason: '',
    releaseDate: '',
    shortDescription: '',
  };
  errorMsg: Array<string> = [];
  selectedFragranceCover: any;
  selectedPicture: string | undefined;
  isFileSelected: boolean = false;

  constructor(
    private fragranceService: FragranceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const fragranceId = this.activatedRoute.snapshot.params['id'];
    if (fragranceId) {
      this.fragranceService.findFragranceById({
        'fragrance-id': fragranceId
      }).subscribe({
        next: (fragrance) => {
          this.fragranceRequest = {
            name: fragrance.name as string,
            brand: fragrance.brand as string,
            recommendedSeason: fragrance.recommendedSeason as string,
            releaseDate: fragrance.releaseDate as string,
            shortDescription: fragrance.shortDescription as string,
            discontinued: fragrance.discontinued as boolean,
          };
          this.selectedPicture = 'data:image/jpg;base64,' + fragrance.picture;
        }
      });
    }
  }

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

    console.log("uff " + this.selectedToppings.value);
    console.log("buff " + this.selectedCityCodes);

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
