import {Component, Input} from '@angular/core';
import {FragranceResponse} from "../../../../services/models/fragrance-response";
import {Router} from "@angular/router";
import {ReviewResponsePicture} from "../../../../services/models/review-response-picture";

@Component({
  selector: 'app-fragrance-item-review',
  templateUrl: './fragrance-item-review.component.html',
  styleUrl: './fragrance-item-review.component.scss'
})
export class FragranceItemReviewComponent {
  @Input() review: ReviewResponsePicture | undefined;
  constructor(private router: Router) {}
  redirectToPage() {
    if (this.review) {
      this.router.navigate(['fragrances', 'page', this.review.fragranceId]);
    } else {
      console.error("Fragrance is undefined");
    }
  }

  openFragranceInNewTab(event: MouseEvent) {
    event.preventDefault();

    if (this.review) {
      const fragranceUrl = `/fragrances/page/${this.review.fragranceId}`;

      window.open(fragranceUrl, '_blank');
    } else {
      console.error('Fragrance is undefined');
    }
  }
}
