/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FragranceResponse } from '../../models/fragrance-response';

export interface FindFragranceById$Params {
  'fragrance-id': number;
}

export function findFragranceById(http: HttpClient, rootUrl: string, params: FindFragranceById$Params, context?: HttpContext): Observable<StrictHttpResponse<FragranceResponse>> {
  const rb = new RequestBuilder(rootUrl, findFragranceById.PATH, 'get');
  if (params) {
    rb.path('fragrance-id', params['fragrance-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FragranceResponse>;
    })
  );
}

findFragranceById.PATH = '/fragrances/{fragrance-id}';
