/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { claimPoints } from '../fn/user/claim-points';
import { ClaimPoints$Params } from '../fn/user/claim-points';
import { deleteUser } from '../fn/user/delete-user';
import { DeleteUser$Params } from '../fn/user/delete-user';
import { findAllUsers } from '../fn/user/find-all-users';
import { FindAllUsers$Params } from '../fn/user/find-all-users';
import { findUserById } from '../fn/user/find-user-by-id';
import { FindUserById$Params } from '../fn/user/find-user-by-id';
import { getAllClaimsByUserId } from '../fn/user/get-all-claims-by-user-id';
import { GetAllClaimsByUserId$Params } from '../fn/user/get-all-claims-by-user-id';
import { isDailyGiftClaimed } from '../fn/user/is-daily-gift-claimed';
import { IsDailyGiftClaimed$Params } from '../fn/user/is-daily-gift-claimed';
import { lockUser } from '../fn/user/lock-user';
import { LockUser$Params } from '../fn/user/lock-user';
import { PageResponseClaimResponse } from '../models/page-response-claim-response';
import { PageResponseUserResponse } from '../models/page-response-user-response';
import { updatePrivacy } from '../fn/user/update-privacy';
import { UpdatePrivacy$Params } from '../fn/user/update-privacy';
import { updateUser } from '../fn/user/update-user';
import { UpdateUser$Params } from '../fn/user/update-user';
import { uploadBackgroundPicture } from '../fn/user/upload-background-picture';
import { UploadBackgroundPicture$Params } from '../fn/user/upload-background-picture';
import { uploadBackgroundPictureAdmin } from '../fn/user/upload-background-picture-admin';
import { UploadBackgroundPictureAdmin$Params } from '../fn/user/upload-background-picture-admin';
import { uploadProfilePicture } from '../fn/user/upload-profile-picture';
import { UploadProfilePicture$Params } from '../fn/user/upload-profile-picture';
import { uploadProfilePictureAdmin } from '../fn/user/upload-profile-picture-admin';
import { UploadProfilePictureAdmin$Params } from '../fn/user/upload-profile-picture-admin';
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

  /** Path part for operation `updatePrivacy()` */
  static readonly UpdatePrivacyPath = '/users/{user-id}/private';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePrivacy()` instead.
   *
   * This method doesn't expect any request body.
   */
  updatePrivacy$Response(params: UpdatePrivacy$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updatePrivacy(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updatePrivacy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updatePrivacy(params: UpdatePrivacy$Params, context?: HttpContext): Observable<void> {
    return this.updatePrivacy$Response(params, context).pipe(
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

  /** Path part for operation `uploadProfilePictureAdmin()` */
  static readonly UploadProfilePictureAdminPath = '/users/profile/admin/{user-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadProfilePictureAdmin()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProfilePictureAdmin$Response(params: UploadProfilePictureAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadProfilePictureAdmin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadProfilePictureAdmin$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProfilePictureAdmin(params: UploadProfilePictureAdmin$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadProfilePictureAdmin$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `uploadProfilePicture()` */
  static readonly UploadProfilePicturePath = '/users/profile/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadProfilePicture()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProfilePicture$Response(params?: UploadProfilePicture$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadProfilePicture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadProfilePicture$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProfilePicture(params?: UploadProfilePicture$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadProfilePicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `claimPoints()` */
  static readonly ClaimPointsPath = '/users/claim-points/{user-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `claimPoints()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  claimPoints$Response(params: ClaimPoints$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return claimPoints(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `claimPoints$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  claimPoints(params: ClaimPoints$Params, context?: HttpContext): Observable<string> {
    return this.claimPoints$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `uploadBackgroundPictureAdmin()` */
  static readonly UploadBackgroundPictureAdminPath = '/users/background/admin/{user-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadBackgroundPictureAdmin()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBackgroundPictureAdmin$Response(params: UploadBackgroundPictureAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadBackgroundPictureAdmin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadBackgroundPictureAdmin$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBackgroundPictureAdmin(params: UploadBackgroundPictureAdmin$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadBackgroundPictureAdmin$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `uploadBackgroundPicture()` */
  static readonly UploadBackgroundPicturePath = '/users/background/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadBackgroundPicture()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBackgroundPicture$Response(params?: UploadBackgroundPicture$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadBackgroundPicture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadBackgroundPicture$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBackgroundPicture(params?: UploadBackgroundPicture$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadBackgroundPicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
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

  /** Path part for operation `getAllClaimsByUserId()` */
  static readonly GetAllClaimsByUserIdPath = '/users/claim-points/{user-id}/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllClaimsByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllClaimsByUserId$Response(params: GetAllClaimsByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseClaimResponse>> {
    return getAllClaimsByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllClaimsByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllClaimsByUserId(params: GetAllClaimsByUserId$Params, context?: HttpContext): Observable<PageResponseClaimResponse> {
    return this.getAllClaimsByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseClaimResponse>): PageResponseClaimResponse => r.body)
    );
  }

  /** Path part for operation `isDailyGiftClaimed()` */
  static readonly IsDailyGiftClaimedPath = '/users/claim-gift/{user-id}/today';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `isDailyGiftClaimed()` instead.
   *
   * This method doesn't expect any request body.
   */
  isDailyGiftClaimed$Response(params: IsDailyGiftClaimed$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return isDailyGiftClaimed(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `isDailyGiftClaimed$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  isDailyGiftClaimed(params: IsDailyGiftClaimed$Params, context?: HttpContext): Observable<boolean> {
    return this.isDailyGiftClaimed$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
