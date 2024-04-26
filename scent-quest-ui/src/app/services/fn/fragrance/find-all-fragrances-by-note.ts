/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseFragranceResponse } from '../../models/page-response-fragrance-response';

export interface FindAllFragrancesByNote$Params {
  page?: number;
  size?: number;
  'fragrance-note': string;
}

export function findAllFragrancesByNote(http: HttpClient, rootUrl: string, params: FindAllFragrancesByNote$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFragranceResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllFragrancesByNote.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.path('fragrance-note', params['fragrance-note'], {});
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

findAllFragrancesByNote.PATH = '/fragrances/{fragrance-note}/notes';
