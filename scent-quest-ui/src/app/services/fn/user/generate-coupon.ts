/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GenerateCoupon$Params {
  'site-id': number;
  'user-id': number;
}

export function generateCoupon(http: HttpClient, rootUrl: string, params: GenerateCoupon$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, generateCoupon.PATH, 'post');
  if (params) {
    rb.query('site-id', params['site-id'], {});
    rb.query('user-id', params['user-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

generateCoupon.PATH = '/users/sites/{site-id}/coupons/{user-id}';
