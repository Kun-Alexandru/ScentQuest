/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PerfumerResponse } from '../../models/perfumer-response';

export interface FindPerfumersByFragranceId$Params {
  'fragrance-id': number;
}

export function findPerfumersByFragranceId(http: HttpClient, rootUrl: string, params: FindPerfumersByFragranceId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PerfumerResponse>>> {
  const rb = new RequestBuilder(rootUrl, findPerfumersByFragranceId.PATH, 'get');
  if (params) {
    rb.path('fragrance-id', params['fragrance-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<PerfumerResponse>>;
    })
  );
}

findPerfumersByFragranceId.PATH = '/fragrances/{fragrance-id}/perfumers';
