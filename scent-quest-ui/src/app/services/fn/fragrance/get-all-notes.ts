/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NoteResponse } from '../../models/note-response';

export interface GetAllNotes$Params {
}

export function getAllNotes(http: HttpClient, rootUrl: string, params?: GetAllNotes$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<NoteResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllNotes.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<NoteResponse>>;
    })
  );
}

getAllNotes.PATH = '/fragrances/notes';
