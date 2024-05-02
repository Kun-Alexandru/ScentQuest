/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteReview } from '../fn/review/delete-review';
import { DeleteReview$Params } from '../fn/review/delete-review';
import { getReviewById } from '../fn/review/get-review-by-id';
import { GetReviewById$Params } from '../fn/review/get-review-by-id';
import { PageResponseReviewResponse } from '../models/page-response-review-response';
import { ReviewResponse } from '../models/review-response';
import { reviewsByFragrance } from '../fn/review/reviews-by-fragrance';
import { ReviewsByFragrance$Params } from '../fn/review/reviews-by-fragrance';
import { saveReview } from '../fn/review/save-review';
import { SaveReview$Params } from '../fn/review/save-review';
import { updateReview } from '../fn/review/update-review';
import { UpdateReview$Params } from '../fn/review/update-review';


/**
 * The review API
 */
@Injectable({ providedIn: 'root' })
export class ReviewService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateReview()` */
  static readonly UpdateReviewPath = '/reviews';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateReview()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateReview$Response(params: UpdateReview$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateReview(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateReview$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateReview(params: UpdateReview$Params, context?: HttpContext): Observable<void> {
    return this.updateReview$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `saveReview()` */
  static readonly SaveReviewPath = '/reviews';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveReview()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveReview$Response(params: SaveReview$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveReview(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveReview$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveReview(params: SaveReview$Params, context?: HttpContext): Observable<number> {
    return this.saveReview$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `reviewsByFragrance()` */
  static readonly ReviewsByFragrancePath = '/reviews/fragrance/{fragranceId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `reviewsByFragrance()` instead.
   *
   * This method doesn't expect any request body.
   */
  reviewsByFragrance$Response(params: ReviewsByFragrance$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseReviewResponse>> {
    return reviewsByFragrance(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `reviewsByFragrance$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  reviewsByFragrance(params: ReviewsByFragrance$Params, context?: HttpContext): Observable<PageResponseReviewResponse> {
    return this.reviewsByFragrance$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseReviewResponse>): PageResponseReviewResponse => r.body)
    );
  }

  /** Path part for operation `getReviewById()` */
  static readonly GetReviewByIdPath = '/reviews/fragrance/{fragranceId}/owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getReviewById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReviewById$Response(params: GetReviewById$Params, context?: HttpContext): Observable<StrictHttpResponse<ReviewResponse>> {
    return getReviewById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getReviewById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReviewById(params: GetReviewById$Params, context?: HttpContext): Observable<ReviewResponse> {
    return this.getReviewById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ReviewResponse>): ReviewResponse => r.body)
    );
  }

  /** Path part for operation `deleteReview()` */
  static readonly DeleteReviewPath = '/reviews/{reviewId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteReview()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReview$Response(params: DeleteReview$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteReview(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteReview$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteReview(params: DeleteReview$Params, context?: HttpContext): Observable<void> {
    return this.deleteReview$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
