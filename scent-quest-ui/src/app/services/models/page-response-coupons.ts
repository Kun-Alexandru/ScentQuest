/* tslint:disable */
/* eslint-disable */
import { Coupons } from '../models/coupons';
export interface PageResponseCoupons {
  content?: Array<Coupons>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
