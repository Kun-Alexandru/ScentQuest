/* tslint:disable */
/* eslint-disable */
import { FragranceResponse } from '../models/fragrance-response';
export interface PageResponseFragranceResponse {
  content?: Array<FragranceResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
