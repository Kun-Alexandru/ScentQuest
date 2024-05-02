/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UpdateNotesInFragrance$Params {
  fragranceId: number;
      body: Array<number>
}

export function updateNotesInFragrance(http: HttpClient, rootUrl: string, params: UpdateNotesInFragrance$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, updateNotesInFragrance.PATH, 'put');
  if (params) {
    rb.path('fragranceId', params.fragranceId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

updateNotesInFragrance.PATH = '/fragrances/{fragranceId}/notess';
