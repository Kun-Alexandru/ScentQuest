/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteFavourite } from '../fn/fragrance/delete-favourite';
import { DeleteFavourite$Params } from '../fn/fragrance/delete-favourite';
import { findAllFavoritedFragrancesByOwner } from '../fn/fragrance/find-all-favorited-fragrances-by-owner';
import { FindAllFavoritedFragrancesByOwner$Params } from '../fn/fragrance/find-all-favorited-fragrances-by-owner';
import { findAllFavouritesByUserId } from '../fn/fragrance/find-all-favourites-by-user-id';
import { FindAllFavouritesByUserId$Params } from '../fn/fragrance/find-all-favourites-by-user-id';
import { findAllFragrances } from '../fn/fragrance/find-all-fragrances';
import { FindAllFragrances$Params } from '../fn/fragrance/find-all-fragrances';
import { findAllFragrancesByOwner } from '../fn/fragrance/find-all-fragrances-by-owner';
import { FindAllFragrancesByOwner$Params } from '../fn/fragrance/find-all-fragrances-by-owner';
import { findAllNotesByFragranceId } from '../fn/fragrance/find-all-notes-by-fragrance-id';
import { FindAllNotesByFragranceId$Params } from '../fn/fragrance/find-all-notes-by-fragrance-id';
import { findFavouriteByUserIdAndFragranceId } from '../fn/fragrance/find-favourite-by-user-id-and-fragrance-id';
import { FindFavouriteByUserIdAndFragranceId$Params } from '../fn/fragrance/find-favourite-by-user-id-and-fragrance-id';
import { findFragranceById } from '../fn/fragrance/find-fragrance-by-id';
import { FindFragranceById$Params } from '../fn/fragrance/find-fragrance-by-id';
import { findPerfumersByFragranceId } from '../fn/fragrance/find-perfumers-by-fragrance-id';
import { FindPerfumersByFragranceId$Params } from '../fn/fragrance/find-perfumers-by-fragrance-id';
import { FragranceResponse } from '../models/fragrance-response';
import { getAllNotes } from '../fn/fragrance/get-all-notes';
import { GetAllNotes$Params } from '../fn/fragrance/get-all-notes';
import { getAllPerfumers } from '../fn/fragrance/get-all-perfumers';
import { GetAllPerfumers$Params } from '../fn/fragrance/get-all-perfumers';
import { NoteResponse } from '../models/note-response';
import { PageResponseFragranceResponse } from '../models/page-response-fragrance-response';
import { PerfumerResponse } from '../models/perfumer-response';
import { saveFavourite } from '../fn/fragrance/save-favourite';
import { SaveFavourite$Params } from '../fn/fragrance/save-favourite';
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

  /** Path part for operation `findAllFavouritesByUserId()` */
  static readonly FindAllFavouritesByUserIdPath = '/fragrances/favourite';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllFavouritesByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFavouritesByUserId$Response(params?: FindAllFavouritesByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<number>>> {
    return findAllFavouritesByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllFavouritesByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFavouritesByUserId(params?: FindAllFavouritesByUserId$Params, context?: HttpContext): Observable<Array<number>> {
    return this.findAllFavouritesByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<number>>): Array<number> => r.body)
    );
  }

  /** Path part for operation `saveFavourite()` */
  static readonly SaveFavouritePath = '/fragrances/favourite';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveFavourite()` instead.
   *
   * This method doesn't expect any request body.
   */
  saveFavourite$Response(params: SaveFavourite$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveFavourite(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveFavourite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  saveFavourite(params: SaveFavourite$Params, context?: HttpContext): Observable<number> {
    return this.saveFavourite$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `deleteFavourite()` */
  static readonly DeleteFavouritePath = '/fragrances/favourite';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFavourite()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFavourite$Response(params: DeleteFavourite$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return deleteFavourite(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteFavourite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFavourite(params: DeleteFavourite$Params, context?: HttpContext): Observable<number> {
    return this.deleteFavourite$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
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

  /** Path part for operation `findPerfumersByFragranceId()` */
  static readonly FindPerfumersByFragranceIdPath = '/fragrances/{fragrance-id}/perfumers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPerfumersByFragranceId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPerfumersByFragranceId$Response(params: FindPerfumersByFragranceId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PerfumerResponse>>> {
    return findPerfumersByFragranceId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findPerfumersByFragranceId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPerfumersByFragranceId(params: FindPerfumersByFragranceId$Params, context?: HttpContext): Observable<Array<PerfumerResponse>> {
    return this.findPerfumersByFragranceId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PerfumerResponse>>): Array<PerfumerResponse> => r.body)
    );
  }

  /** Path part for operation `findAllNotesByFragranceId()` */
  static readonly FindAllNotesByFragranceIdPath = '/fragrances/{fragrance-id}/notes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllNotesByFragranceId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllNotesByFragranceId$Response(params: FindAllNotesByFragranceId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<NoteResponse>>> {
    return findAllNotesByFragranceId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllNotesByFragranceId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllNotesByFragranceId(params: FindAllNotesByFragranceId$Params, context?: HttpContext): Observable<Array<NoteResponse>> {
    return this.findAllNotesByFragranceId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<NoteResponse>>): Array<NoteResponse> => r.body)
    );
  }

  /** Path part for operation `getAllPerfumers()` */
  static readonly GetAllPerfumersPath = '/fragrances/perfumers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPerfumers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPerfumers$Response(params?: GetAllPerfumers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PerfumerResponse>>> {
    return getAllPerfumers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllPerfumers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPerfumers(params?: GetAllPerfumers$Params, context?: HttpContext): Observable<Array<PerfumerResponse>> {
    return this.getAllPerfumers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PerfumerResponse>>): Array<PerfumerResponse> => r.body)
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

  /** Path part for operation `getAllNotes()` */
  static readonly GetAllNotesPath = '/fragrances/notes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllNotes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllNotes$Response(params?: GetAllNotes$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<NoteResponse>>> {
    return getAllNotes(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllNotes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllNotes(params?: GetAllNotes$Params, context?: HttpContext): Observable<Array<NoteResponse>> {
    return this.getAllNotes$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<NoteResponse>>): Array<NoteResponse> => r.body)
    );
  }

  /** Path part for operation `findFavouriteByUserIdAndFragranceId()` */
  static readonly FindFavouriteByUserIdAndFragranceIdPath = '/fragrances/favourite/{fragrance-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFavouriteByUserIdAndFragranceId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFavouriteByUserIdAndFragranceId$Response(params: FindFavouriteByUserIdAndFragranceId$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return findFavouriteByUserIdAndFragranceId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findFavouriteByUserIdAndFragranceId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFavouriteByUserIdAndFragranceId(params: FindFavouriteByUserIdAndFragranceId$Params, context?: HttpContext): Observable<number> {
    return this.findFavouriteByUserIdAndFragranceId$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findAllFavoritedFragrancesByOwner()` */
  static readonly FindAllFavoritedFragrancesByOwnerPath = '/fragrances/favourite/owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllFavoritedFragrancesByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFavoritedFragrancesByOwner$Response(params?: FindAllFavoritedFragrancesByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFragranceResponse>> {
    return findAllFavoritedFragrancesByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllFavoritedFragrancesByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFavoritedFragrancesByOwner(params?: FindAllFavoritedFragrancesByOwner$Params, context?: HttpContext): Observable<PageResponseFragranceResponse> {
    return this.findAllFavoritedFragrancesByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseFragranceResponse>): PageResponseFragranceResponse => r.body)
    );
  }

}
