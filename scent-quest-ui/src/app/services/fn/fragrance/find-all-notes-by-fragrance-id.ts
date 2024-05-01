/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NoteResponse } from '../../models/note-response';

export interface FindAllNotesByFragranceId$Params {
  'fragrance-id': number;
}

export function findAllNotesByFragranceId(http: HttpClient, rootUrl: string, params: FindAllNotesByFragranceId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<NoteResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllNotesByFragranceId.PATH, 'get');
  if (params) {
    rb.path('fragrance-id', params['fragrance-id'], {});
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

findAllNotesByFragranceId.PATH = '/fragrances/{fragrance-id}/notes';
