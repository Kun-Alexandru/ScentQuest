/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAllFragrances } from '../fn/fragrance/find-all-fragrances';
import { FindAllFragrances$Params } from '../fn/fragrance/find-all-fragrances';
import { findAllFragrancesByNote } from '../fn/fragrance/find-all-fragrances-by-note';
import { FindAllFragrancesByNote$Params } from '../fn/fragrance/find-all-fragrances-by-note';
import { findAllFragrancesByOwner } from '../fn/fragrance/find-all-fragrances-by-owner';
import { FindAllFragrancesByOwner$Params } from '../fn/fragrance/find-all-fragrances-by-owner';
import { findAllFragrancesByPerfumer } from '../fn/fragrance/find-all-fragrances-by-perfumer';
import { FindAllFragrancesByPerfumer$Params } from '../fn/fragrance/find-all-fragrances-by-perfumer';
import { findFragranceById } from '../fn/fragrance/find-fragrance-by-id';
import { FindFragranceById$Params } from '../fn/fragrance/find-fragrance-by-id';
import { FragranceResponse } from '../models/fragrance-response';
import { PageResponseFragranceResponse } from '../models/page-response-fragrance-response';
import { saveFragrance } from '../fn/fragrance/save-fragrance';
import { SaveFragrance$Params } from '../fn/fragrance/save-fragrance';
import { updateDiscontinued } from '../fn/fragrance/update-discontinued';
import { UpdateDiscontinued$Params } from '../fn/fragrance/update-discontinued';
import { uploadFragrancePicture } from '../fn/fragrance/upload-fragrance-picture';
import { UploadFragrancePicture$Params } from '../fn/fragrance/upload-fragrance-picture';


/**
 * The fragrance API
 */
@Injectable({ providedIn: 'root' })
export class FragranceService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllFragrances()` */
  static readonly FindAllFragrancesPath = '/fragrances';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllFragrances()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFragrances$Response(params?: FindAllFragrances$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFragranceResponse>> {
    return findAllFragrances(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllFragrances$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFragrances(params?: FindAllFragrances$Params, context?: HttpContext): Observable<PageResponseFragranceResponse> {
    return this.findAllFragrances$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseFragranceResponse>): PageResponseFragranceResponse => r.body)
    );
  }

  /** Path part for operation `saveFragrance()` */
  static readonly SaveFragrancePath = '/fragrances';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveFragrance()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFragrance$Response(params: SaveFragrance$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveFragrance(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveFragrance$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFragrance(params: SaveFragrance$Params, context?: HttpContext): Observable<number> {
    return this.saveFragrance$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadFragrancePicture()` */
  static readonly UploadFragrancePicturePath = '/fragrances/picture/{fragrance-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFragrancePicture()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFragrancePicture$Response(params: UploadFragrancePicture$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadFragrancePicture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadFragrancePicture$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFragrancePicture(params: UploadFragrancePicture$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadFragrancePicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `updateDiscontinued()` */
  static readonly UpdateDiscontinuedPath = '/fragrances/discontinued/{fragrance-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDiscontinued()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateDiscontinued$Response(params: UpdateDiscontinued$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateDiscontinued(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateDiscontinued$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateDiscontinued(params: UpdateDiscontinued$Params, context?: HttpContext): Observable<number> {
    return this.updateDiscontinued$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findAllFragrancesByPerfumer()` */
  static readonly FindAllFragrancesByPerfumerPath = '/fragrances/{fragrance-perfumer-id}/perfumers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllFragrancesByPerfumer()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFragrancesByPerfumer$Response(params: FindAllFragrancesByPerfumer$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFragranceResponse>> {
    return findAllFragrancesByPerfumer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllFragrancesByPerfumer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFragrancesByPerfumer(params: FindAllFragrancesByPerfumer$Params, context?: HttpContext): Observable<PageResponseFragranceResponse> {
    return this.findAllFragrancesByPerfumer$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseFragranceResponse>): PageResponseFragranceResponse => r.body)
    );
  }

  /** Path part for operation `findAllFragrancesByNote()` */
  static readonly FindAllFragrancesByNotePath = '/fragrances/{fragrance-note}/notes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllFragrancesByNote()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFragrancesByNote$Response(params: FindAllFragrancesByNote$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFragranceResponse>> {
    return findAllFragrancesByNote(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllFragrancesByNote$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFragrancesByNote(params: FindAllFragrancesByNote$Params, context?: HttpContext): Observable<PageResponseFragranceResponse> {
    return this.findAllFragrancesByNote$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseFragranceResponse>): PageResponseFragranceResponse => r.body)
    );
  }

  /** Path part for operation `findFragranceById()` */
  static readonly FindFragranceByIdPath = '/fragrances/{fragrance-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFragranceById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFragranceById$Response(params: FindFragranceById$Params, context?: HttpContext): Observable<StrictHttpResponse<FragranceResponse>> {
    return findFragranceById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findFragranceById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFragranceById(params: FindFragranceById$Params, context?: HttpContext): Observable<FragranceResponse> {
    return this.findFragranceById$Response(params, context).pipe(
      map((r: StrictHttpResponse<FragranceResponse>): FragranceResponse => r.body)
    );
  }

  /** Path part for operation `findAllFragrancesByOwner()` */
  static readonly FindAllFragrancesByOwnerPath = '/fragrances/owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllFragrancesByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFragrancesByOwner$Response(params?: FindAllFragrancesByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFragranceResponse>> {
    return findAllFragrancesByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllFragrancesByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFragrancesByOwner(params?: FindAllFragrancesByOwner$Params, context?: HttpContext): Observable<PageResponseFragranceResponse> {
    return this.findAllFragrancesByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseFragranceResponse>): PageResponseFragranceResponse => r.body)
    );
  }

}
