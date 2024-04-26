/* tslint:disable */
/* eslint-disable */
import { ReviewResponse } from '../models/review-response';
export interface PageResponseReviewResponse {
  content?: Array<ReviewResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
