/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FragranceRequest } from '../../models/fragrance-request';

export interface UpdateFragrance$Params {
  noteIds: Array<number>;
  perfumerIds: Array<number>;
      body: FragranceRequest
}

export function updateFragrance(http: HttpClient, rootUrl: string, params: UpdateFragrance$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, updateFragrance.PATH, 'put');
  if (params) {
    rb.query('noteIds', params.noteIds, {});
    rb.query('perfumerIds', params.perfumerIds, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

updateFragrance.PATH = '/fragrances';
