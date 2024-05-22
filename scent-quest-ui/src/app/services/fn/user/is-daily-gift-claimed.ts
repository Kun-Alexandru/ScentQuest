/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface IsDailyGiftClaimed$Params {
  'user-id': number;
  date: string;
}

export function isDailyGiftClaimed(http: HttpClient, rootUrl: string, params: IsDailyGiftClaimed$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
  const rb = new RequestBuilder(rootUrl, isDailyGiftClaimed.PATH, 'get');
  if (params) {
    rb.query('user-id', params['user-id'], {});
    rb.query('date', params.date, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
    })
  );
}

isDailyGiftClaimed.PATH = '/users/claim-gift/{user-id}/today';
