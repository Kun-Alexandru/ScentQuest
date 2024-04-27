import {Component, OnInit} from '@angular/core';
import {PageResponseFragranceResponse} from "../../../../services/models/page-response-fragrance-response";
import {FragranceService} from "../../../../services/services/fragrance.service";
import {Router} from "@angular/router";
import {FragranceResponse} from "../../../../services/models/fragrance-response";

@Component({
  selector: 'app-my-fragrances',
  templateUrl: './my-fragrances.component.html',
  styleUrl: './my-fragrances.component.scss'
})
export class MyFragrancesComponent implements OnInit {
  fragranceResponse: PageResponseFragranceResponse = {};
  page = 0;
  size = 5;
  pages: any = [];

  constructor(
    private fragranceService: FragranceService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllFragrances();
  }

  private findAllFragrances() {
    this.fragranceService.findAllFragrancesByOwner({
      page: this.page,
      size: this.size
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

  deleteFragrance(fragrance: FragranceResponse) {

  }

  editFragrance(fragrance: FragranceResponse) {
    this.router.navigate(['fragrances', 'manage', fragrance.fragranceId]);
  }
}