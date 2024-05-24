/* tslint:disable */
/* eslint-disable */
import { Sites } from '../models/sites';
export interface PageResponseSites {
  content?: Array<Sites>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
