import { Component, OnInit } from '@angular/core';
import { NoteResponse } from '../../../../services/models/note-response';
import { FragranceService } from '../../../../services/services/fragrance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {PageResponseFragranceResponse} from "../../../../services/models/page-response-fragrance-response";

@Component({
  selector: 'app-fragrance-finder',
  templateUrl: './fragrance-finder.component.html',
  styleUrls: ['./fragrance-finder.component.scss']
})
export class FragranceFinderComponent implements OnInit {
  includeNotes: NoteResponse[] = [];
  excludeNotes: NoteResponse[] = [];
  allNotes: NoteResponse[] = [];
  page = 0;
  size = 6;
  pages: any = [];
  showFragrances: boolean = false;
  fragranceResponse: PageResponseFragranceResponse = {};
  numberOfFragrances: number | undefined = 0;

  includePerfumes: string = '';
  excludePerfumes: string = '';
  selectedGender: string = '';
  selectedSeason: string = '';

  constructor(
    private fragranceService: FragranceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllNotes();
  }

  getAllNotes() {
    this.fragranceService.getAllNotes().subscribe({
      next: (notes) => {
        this.allNotes = notes;
      }
    });
  }

  searchFragrances() {

    const includeNoteNames: string[] = this.includeNotes.map(note => note.name || '');
    const excludeNoteNames: string[] = this.excludeNotes.map(note => note.name || '');

    this.fragranceService.findAllFragrancesByNotesSeasonGender({
      'includedNotes': includeNoteNames,
      'excludedNotes': excludeNoteNames,
      'season': this.selectedSeason,
      'gender': this.selectedGender,
      'page': this.page,
      'size': this.size
    })
      .subscribe({
        next: (fragrances) => {
          this.fragranceResponse = fragrances;
          this.showFragrances = true;
          this.numberOfFragrances = this.fragranceResponse.totalElements;
          this.pages = Array(this.fragranceResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        }
      });
  }
}
