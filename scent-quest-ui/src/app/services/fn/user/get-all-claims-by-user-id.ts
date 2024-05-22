/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseClaimResponse } from '../../models/page-response-claim-response';

export interface GetAllClaimsByUserId$Params {
  'user-id': number;
  page?: number;
  size?: number;
}

export function getAllClaimsByUserId(http: HttpClient, rootUrl: string, params: GetAllClaimsByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseClaimResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllClaimsByUserId.PATH, 'get');
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
      return r as StrictHttpResponse<PageResponseClaimResponse>;
    })
  );
}

getAllClaimsByUserId.PATH = '/users/claim-points/{user-id}/user';
