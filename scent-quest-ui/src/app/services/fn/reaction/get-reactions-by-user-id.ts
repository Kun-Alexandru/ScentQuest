/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ReactionResponse } from '../../models/reaction-response';

export interface GetReactionsByUserId$Params {
  userId: number;
}

export function getReactionsByUserId(http: HttpClient, rootUrl: string, params: GetReactionsByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ReactionResponse>>> {
  const rb = new RequestBuilder(rootUrl, getReactionsByUserId.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ReactionResponse>>;
    })
  );
}

getReactionsByUserId.PATH = '/reactions/{userId}';
