import { Component, OnInit } from '@angular/core';
import { FragranceRequest } from '../../../../services/models/fragrance-request';
import { FragranceService } from '../../../../services/services/fragrance.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NoteResponse} from "../../../../services/models/note-response";
import {PerfumerResponse} from "../../../../services/models/perfumer-response";

@Component({
  selector: 'app-manage-fragrance',
  templateUrl: './manage-fragrance.component.html',
  styleUrls: ['./manage-fragrance.component.scss']
})
export class ManageFragranceComponent implements OnInit {
  notes: NoteResponse[] = [];
  allNotes: NoteResponse[] = [];

  perfumers: PerfumerResponse[] = [];
  allPerfumers: PerfumerResponse[] = [];

  fragranceRequest: FragranceRequest = {
    brand: '',
    discontinued: false,
    name: '',
    recommendedSeason: '',
    releaseDate: '',
    shortDescription: '',
    gender: '',
    concentration: '',
    number_of_likes: 0,
    number_of_dislikes: 0
  };
  errorMsg: Array<string> = [];
  selectedFragranceCover: any;
  selectedPicture: string | undefined;
  selectedPicturePrevious: any;
  isFileSelected: boolean = false;
  isFileSelectedTruly: boolean = false;

  constructor(
    private fragranceService: FragranceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const fragranceId = this.activatedRoute.snapshot.params['id'];
    if (fragranceId) {
      this.isFileSelected = true;
      this.fragranceService.findFragranceById({
        'fragrance-id': fragranceId
      }).subscribe({
        next: (fragrance) => {
          this.fragranceRequest = {
            FragranceId: fragranceId as number,
            name: fragrance.name as string,
            brand: fragrance.brand as string,
            recommendedSeason: fragrance.recommendedSeason as string,
            releaseDate: fragrance.releaseDate as string,
            shortDescription: fragrance.shortDescription as string,
            discontinued: fragrance.discontinued as boolean,
            concentration: fragrance.concentration as string,
            gender: fragrance.gender as string,
            number_of_likes: 0 as number
          };
          if(fragrance.picture != null) {
            this.isFileSelected = true;
          }
          this.selectedPicture = 'data:image/jpg;base64,' + fragrance.picture;
        }
      });

      this.fragranceService.findAllNotesByFragranceId({
        'fragrance-id': fragranceId
      }).subscribe({
        next: (notes) => {
          this.notes = notes;
        }
      })

      this.fragranceService.findPerfumersByFragranceId({
        'fragrance-id': fragranceId
      }).subscribe({
        next: (perfumers) => {
          this.perfumers = perfumers;
        }

      })
    }

      this.fragranceService.getAllNotes().subscribe({
        next: (notes) => {
          this.allNotes = notes;
        }
      })

      this.fragranceService.getAllPerfumers().subscribe({
        next: (perfumers) => {
          this.allPerfumers = perfumers;
        }
      })
  }

  onFileSelected(event: Event) {
    this.selectedFragranceCover = (event.target as HTMLInputElement).files?.[0];
    if (this.selectedFragranceCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFragranceCover);
      this.isFileSelected = true;
      this.isFileSelectedTruly = true;
    }
  }

  saveFragrance() {
    const idfrag = this.activatedRoute.snapshot.params['id'];

    if (!this.selectedFragranceCover && !idfrag) {
      this.isFileSelected = false;
      return;
    }

    if (idfrag) {
      const noteIds: number[] = this.notes.length > 0 ? this.notes.map(note => note.id as number) : [0];
      const perfumerIds: number[] = this.perfumers.length > 0 ? this.perfumers.map(perfumer => perfumer.id as number) : [0];
      this.fragranceService.updateFragrance({
        body: this.fragranceRequest,
        noteIds: noteIds,
        perfumerIds: perfumerIds
      }).subscribe( {
        next: (fragranceId) => {
          if (this.isFileSelectedTruly == true) {
            this.fragranceService.uploadFragrancePicture({
                'fragrance-id': fragranceId,
                body: {
                  file: this.selectedFragranceCover
                }
              }
            ).subscribe({
              next: () => {
                this.router.navigate(['/fragrances']);
              }
            });
        } else {
            this.router.navigate(['/fragrances']);
          }
        }
      })


    } else {
      const noteIds: number[] = this.notes.length > 0 ? this.notes.map(note => note.id as number) : [0];
      const perfumerIds: number[] = this.perfumers.length > 0 ? this.perfumers.map(perfumer => perfumer.id as number) : [0];
      this.fragranceService.saveFragrance({
        body: this.fragranceRequest,
        noteIds: noteIds,
        perfumerIds: perfumerIds
      }).subscribe({
        next: (fragranceId) => {
          this.fragranceService.uploadFragrancePicture({
            'fragrance-id': fragranceId,
            body: {
              file: this.selectedFragranceCover
            }
          }).subscribe({
            next: () => {
              this.router.navigate(['/fragrances']);
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
}
