/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface FindAllFavouritesByUserId$Params {
}

export function findAllFavouritesByUserId(http: HttpClient, rootUrl: string, params?: FindAllFavouritesByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<number>>> {
  const rb = new RequestBuilder(rootUrl, findAllFavouritesByUserId.PATH, 'get');
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

findAllFavouritesByUserId.PATH = '/fragrances/favourite';
