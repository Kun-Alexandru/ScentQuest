/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteFragrance$Params {
  'fragrance-id': number;
}

export function deleteFragrance(http: HttpClient, rootUrl: string, params: DeleteFragrance$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, deleteFragrance.PATH, 'delete');
  if (params) {
    rb.path('fragrance-id', params['fragrance-id'], {});
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

deleteFragrance.PATH = '/fragrances/{fragrance-id}';
