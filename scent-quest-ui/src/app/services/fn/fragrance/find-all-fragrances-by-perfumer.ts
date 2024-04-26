/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseFragranceResponse } from '../../models/page-response-fragrance-response';

export interface FindAllFragrancesByPerfumer$Params {
  page?: number;
  size?: number;
  'fragrance-perfumer-id': number;
}

export function findAllFragrancesByPerfumer(http: HttpClient, rootUrl: string, params: FindAllFragrancesByPerfumer$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFragranceResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllFragrancesByPerfumer.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.path('fragrance-perfumer-id', params['fragrance-perfumer-id'], {});
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

findAllFragrancesByPerfumer.PATH = '/fragrances/{fragrance-perfumer-id}/perfumers';
