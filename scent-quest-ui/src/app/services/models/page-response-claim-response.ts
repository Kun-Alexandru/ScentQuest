/* tslint:disable */
/* eslint-disable */
import { ClaimResponse } from '../models/claim-response';
export interface PageResponseClaimResponse {
  content?: Array<ClaimResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
