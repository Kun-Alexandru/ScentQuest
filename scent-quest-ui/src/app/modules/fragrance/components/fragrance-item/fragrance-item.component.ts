import { Component, Input } from '@angular/core';
import { FragranceResponse } from '../../../../services/models/fragrance-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fragrance-item',
  templateUrl: './fragrance-item.component.html',
  styleUrls: ['./fragrance-item.component.scss']
})
export class FragranceItemComponent {
  @Input() fragrance: FragranceResponse | undefined;

  constructor(private router: Router) {}

  redirectToPage() {
    if (this.fragrance) {
      this.router.navigate(['fragrances', 'page', this.fragrance.fragranceId]);
    } else {
      console.error('Fragrance is undefined');
    }
  }

  openFragranceInNewTab(event: MouseEvent) {
    event.preventDefault();

    if (this.fragrance) {
      const fragranceUrl = `/fragrances/page/${this.fragrance.fragranceId}`;

      window.open(fragranceUrl, '_blank');
    } else {
      console.error('Fragrance is undefined');
    }
  }
}
