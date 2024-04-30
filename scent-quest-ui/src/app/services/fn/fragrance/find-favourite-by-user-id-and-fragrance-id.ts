/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface FindFavouriteByUserIdAndFragranceId$Params {
  'fragrance-id': number;
}

export function findFavouriteByUserIdAndFragranceId(http: HttpClient, rootUrl: string, params: FindFavouriteByUserIdAndFragranceId$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, findFavouriteByUserIdAndFragranceId.PATH, 'get');
  if (params) {
    rb.query('fragrance-id', params['fragrance-id'], {});
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

findFavouriteByUserIdAndFragranceId.PATH = '/fragrances/favourite/{fragrance-id}';
