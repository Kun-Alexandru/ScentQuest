/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseFragranceResponse } from '../../models/page-response-fragrance-response';

export interface FindAllFragrancesByOwner$Params {
  page?: number;
  size?: number;
}

export function findAllFragrancesByOwner(http: HttpClient, rootUrl: string, params?: FindAllFragrancesByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFragranceResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllFragrancesByOwner.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseFragranceResponse>;
    })
  );
}

findAllFragrancesByOwner.PATH = '/fragrances/owner';
