/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseReviewResponse } from '../../models/page-response-review-response';

export interface ReviewsByFragrance$Params {
  fragranceId: number;
  page?: number;
  size?: number;
}

export function reviewsByFragrance(http: HttpClient, rootUrl: string, params: ReviewsByFragrance$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseReviewResponse>> {
  const rb = new RequestBuilder(rootUrl, reviewsByFragrance.PATH, 'get');
  if (params) {
    rb.path('fragranceId', params.fragranceId, {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseReviewResponse>;
    })
  );
}

reviewsByFragrance.PATH = '/reviews/fragrance/{fragranceId}';
