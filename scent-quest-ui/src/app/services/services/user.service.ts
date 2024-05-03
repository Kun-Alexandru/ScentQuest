/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteUser } from '../fn/user/delete-user';
import { DeleteUser$Params } from '../fn/user/delete-user';
import { findAllUsers } from '../fn/user/find-all-users';
import { FindAllUsers$Params } from '../fn/user/find-all-users';
import { findUserById } from '../fn/user/find-user-by-id';
import { FindUserById$Params } from '../fn/user/find-user-by-id';
import { lockUser } from '../fn/user/lock-user';
import { LockUser$Params } from '../fn/user/lock-user';
import { PageResponseUserResponse } from '../models/page-response-user-response';
import { updateUser } from '../fn/user/update-user';
import { UpdateUser$Params } from '../fn/user/update-user';
import { UserResponse } from '../models/user-response';


/**
 * The user API
 */
@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findUserById()` */
  static readonly FindUserByIdPath = '/users/{user-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserById$Response(params: FindUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return findUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findUserById(params: FindUserById$Params, context?: HttpContext): Observable<UserResponse> {
    return this.findUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `updateUser()` */
  static readonly UpdateUserPath = '/users/{user-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser$Response(params: UpdateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return updateUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser(params: UpdateUser$Params, context?: HttpContext): Observable<UserResponse> {
    return this.updateUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `deleteUser()` */
  static readonly DeleteUserPath = '/users/{user-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: DeleteUser$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: DeleteUser$Params, context?: HttpContext): Observable<void> {
    return this.deleteUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `lockUser()` */
  static readonly LockUserPath = '/users/{user-id}/lock';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `lockUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  lockUser$Response(params: LockUser$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return lockUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `lockUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  lockUser(params: LockUser$Params, context?: HttpContext): Observable<void> {
    return this.lockUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findAllUsers()` */
  static readonly FindAllUsersPath = '/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUsers$Response(params?: FindAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseUserResponse>> {
    return findAllUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllUsers(params?: FindAllUsers$Params, context?: HttpContext): Observable<PageResponseUserResponse> {
    return this.findAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseUserResponse>): PageResponseUserResponse => r.body)
    );
  }

}
