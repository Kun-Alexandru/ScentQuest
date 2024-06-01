/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseReviewResponsePicture } from '../../models/page-response-review-response-picture';

export interface FindAllReviewsByUserId$Params {
  userId: number;
  page?: number;
  size?: number;
}

export function findAllReviewsByUserId(http: HttpClient, rootUrl: string, params: FindAllReviewsByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseReviewResponsePicture>> {
  const rb = new RequestBuilder(rootUrl, findAllReviewsByUserId.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseReviewResponsePicture>;
    })
  );
}

findAllReviewsByUserId.PATH = '/reviews/fragrance/{userId}/reviewsPicture';
