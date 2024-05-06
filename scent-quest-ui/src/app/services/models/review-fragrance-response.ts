/* tslint:disable */
/* eslint-disable */
import { UserResponse } from '../models/user-response';
export interface ReviewFragranceResponse {
  createdBy?: number;
  createdDate?: string;
  creator?: UserResponse;
  id?: number;
  modifiedAt?: string;
  modifiedBy?: number;
  rating?: number;
  text?: string;
}
