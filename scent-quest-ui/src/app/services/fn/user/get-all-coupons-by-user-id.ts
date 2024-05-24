/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseCoupons } from '../../models/page-response-coupons';

export interface GetAllCouponsByUserId$Params {
  'user-id': number;
  page?: number;
  size?: number;
}

export function getAllCouponsByUserId(http: HttpClient, rootUrl: string, params: GetAllCouponsByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCoupons>> {
  const rb = new RequestBuilder(rootUrl, getAllCouponsByUserId.PATH, 'get');
  if (params) {
    rb.query('user-id', params['user-id'], {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseCoupons>;
    })
  );
}

getAllCouponsByUserId.PATH = '/users/coupons/{user-id}/user';
