import { Component } from '@angular/core';
import {ReviewRequest} from "../../../../services/models/review-request";

@Component({
  selector: 'app-leave-feedback',
  templateUrl: './leave-feedback.component.html',
  styleUrl: './leave-feedback.component.scss'
})
export class LeaveFeedbackComponent {
  reviewRequest: ReviewRequest = {fragranceId: 1, text: ""}
}
