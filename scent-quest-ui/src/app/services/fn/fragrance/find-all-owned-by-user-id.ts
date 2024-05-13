/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface FindAllOwnedByUserId$Params {
}

export function findAllOwnedByUserId(http: HttpClient, rootUrl: string, params?: FindAllOwnedByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<number>>> {
  const rb = new RequestBuilder(rootUrl, findAllOwnedByUserId.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<number>>;
    })
  );
}

findAllOwnedByUserId.PATH = '/fragrances/owned';
