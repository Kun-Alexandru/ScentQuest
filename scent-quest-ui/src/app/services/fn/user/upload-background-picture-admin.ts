/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UploadBackgroundPictureAdmin$Params {
  'user-id': number;
      body?: {
'file': Blob;
}
}

export function uploadBackgroundPictureAdmin(http: HttpClient, rootUrl: string, params: UploadBackgroundPictureAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, uploadBackgroundPictureAdmin.PATH, 'post');
  if (params) {
    rb.query('user-id', params['user-id'], {});
    rb.body(params.body, 'multipart/form-data');
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

uploadBackgroundPictureAdmin.PATH = '/users/background/admin/{user-id}';
