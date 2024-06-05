/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseFragranceResponse } from '../../models/page-response-fragrance-response';

export interface FindAllFragrancesByNotesSeasonGender$Params {
  page?: number;
  size?: number;
  includedNotes?: Array<string>;
  excludedNotes?: Array<string>;
  notInCollection?: string;
  gender?: string;
  season?: string;
}

export function findAllFragrancesByNotesSeasonGender(http: HttpClient, rootUrl: string, params?: FindAllFragrancesByNotesSeasonGender$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFragranceResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllFragrancesByNotesSeasonGender.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('includedNotes', params.includedNotes, {});
    rb.query('excludedNotes', params.excludedNotes, {});
    rb.query('notInCollection', params.notInCollection, {});
    rb.query('gender', params.gender, {});
    rb.query('season', params.season, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseFragranceResponse>;
    })
  );
}

findAllFragrancesByNotesSeasonGender.PATH = '/fragrances/find';
