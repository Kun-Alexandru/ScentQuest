/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getReactionsByUserId } from '../fn/reaction/get-reactions-by-user-id';
import { GetReactionsByUserId$Params } from '../fn/reaction/get-reactions-by-user-id';
import { ReactionResponse } from '../models/reaction-response';
import { saveReaction } from '../fn/reaction/save-reaction';
import { SaveReaction$Params } from '../fn/reaction/save-reaction';


/**
 * The reaction API
 */
@Injectable({ providedIn: 'root' })
export class ReactionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveReaction()` */
  static readonly SaveReactionPath = '/reactions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveReaction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveReaction$Response(params: SaveReaction$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveReaction(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveReaction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveReaction(params: SaveReaction$Params, context?: HttpContext): Observable<number> {
    return this.saveReaction$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getReactionsByUserId()` */
  static readonly GetReactionsByUserIdPath = '/reactions/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getReactionsByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReactionsByUserId$Response(params: GetReactionsByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ReactionResponse>>> {
    return getReactionsByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getReactionsByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReactionsByUserId(params: GetReactionsByUserId$Params, context?: HttpContext): Observable<Array<ReactionResponse>> {
    return this.getReactionsByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ReactionResponse>>): Array<ReactionResponse> => r.body)
    );
  }

}
